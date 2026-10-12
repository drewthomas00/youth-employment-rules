'use strict';

/**
 * youth-employment-rules — may a worker of this age work this schedule here?
 *
 * NOT LEGAL ADVICE. The tables cover US federal law (the FLSA child labor
 * rules) and the 50 states and DC, for non-agricultural, non-hazardous work.
 * A place they do not cover answers "unknown", never "no limits".
 */

const { AS_OF, JURISDICTIONS: RAW } = require('./data');
const { deepFreeze } = require('./freeze');
const { parseDate, addDays, weekday, weekStart, ageOn, seasonDate, minutes, clock, describe } = require('./dates');

const TABLES = deepFreeze(RAW);
const ADULT_AGE = 18;
const STATES = Object.keys(TABLES).filter((c) => c.startsWith('US-')).sort();

/** The school hours assumed when the caller gives none: the strictest common day. */
const DEFAULT_SCHOOL_HOURS = deepFreeze({ start: '07:00', end: '15:00' });

// ── Jurisdictions ────────────────────────────────────────────────────

/**
 * Normalise a jurisdiction to 'US-XX'. Accepts 'US-CA', 'us-ca', or
 * { country: 'US', subdivision: 'CA' }. Anything unreadable throws; a
 * well-formed place outside the tables is returned as is (and answers unknown).
 * @param {unknown} input
 * @returns {string}
 */
function normalizeJurisdiction(input) {
  let code;
  if (typeof input === 'string') code = input.trim().toUpperCase();
  else if (input && typeof input === 'object' && typeof input.country === 'string') {
    const country = input.country.trim().toUpperCase();
    const sub = typeof input.subdivision === 'string' ? input.subdivision.trim().toUpperCase() : '';
    code = sub ? `${country}-${sub}` : country;
  }
  if (!code || !/^[A-Z]{2}(-[A-Z0-9]{1,3})?$/.test(code)) {
    throw new TypeError(`jurisdiction must be an ISO 3166 code like 'US-CA', got ${describe(input)}`);
  }
  return code;
}

/**
 * The layers of law that apply in a place, outermost first: US federal law,
 * then the state's. null when the tables do not cover the place.
 * @param {string} code
 * @returns {string[] | null}
 */
function layersFor(code) {
  if (!code.startsWith('US-') || !TABLES[code]) return null;
  return ['US', code];
}

/**
 * Whether a layer's rules are in force on `date` (null effectiveFrom reaches
 * back indefinitely).
 * @param {string} layer
 * @param {string} date
 * @returns {boolean}
 */
function inForce(layer, date) {
  const from = TABLES[layer].effectiveFrom;
  return !from || date >= from;
}

// ── One layer's limits for one age on one day ────────────────────────

/**
 * The band of `layer` that covers `age`, or null (no limits from it).
 * @param {string} layer
 * @param {number} age
 */
function bandFor(layer, age) {
  return TABLES[layer].bands.find((b) => age >= b.minAge && age <= b.maxAge) || null;
}

/**
 * Is `date` inside a band's summer window?
 * @param {{ from: string, to: string }} summer
 * @param {string} date
 * @returns {boolean}
 */
function inSummer(summer, date) {
  const year = Number(date.slice(0, 4));
  return date >= seasonDate(summer.from, year) && date <= seasonDate(summer.to, year);
}

/**
 * The time window one layer allows for a shift on `date`.
 * @param {object} band
 * @param {{ date: string, schoolToday: boolean, schoolTomorrow: boolean, vacationToday: boolean }} day
 * @returns {{ earliest: string|null, latest: string|null }}
 */
function windowFor(band, day) {
  const w = band.window;
  let earliest = day.schoolToday ? w.earliestStartSchoolDay : w.earliestStartNonSchoolDay;
  let latest = day.schoolTomorrow ? w.latestEndBeforeSchoolDay : w.latestEndBeforeNonSchoolDay;
  // A seasonal or vacation rule is the same law's own extension for that time
  // of year: it replaces the school-year window. Where both apply, the later
  // end (and earlier start) is what that law allows.
  const extensions = [];
  if (w.summer && inSummer(w.summer, day.date)) extensions.push(w.summer);
  // A vacation rule follows the school calendar, so the last day of a break
  // is still the night before a school day: there the school-night end holds.
  if (w.vacation && day.vacationToday) {
    extensions.push(day.schoolTomorrow ? { earliestStart: w.vacation.earliestStart, latestEnd: latest } : w.vacation);
  }
  if (extensions.length) {
    const ends = extensions.map((e) => e.latestEnd);
    latest = ends.includes(null) ? null : ends.reduce((a, b) => (minutes('latestEnd', a) >= minutes('latestEnd', b) ? a : b));
    // An extension's earliestStart null leaves the school-year start as is;
    // its latestEnd null means that law sets no end time then.
    const starts = extensions.map((e) => (e.earliestStart == null ? earliest : e.earliestStart));
    earliest = starts.includes(null) ? null : starts.reduce((a, b) => (minutes('earliestStart', a) <= minutes('earliestStart', b) ? a : b));
  }
  return { earliest, latest };
}

// ── Combining layers: the stricter rule wins ─────────────────────────

/**
 * One limit from each layer, combined: the binding value and every layer
 * that sets it.
 * @param {Array<{ layer: string, value: any, band: object|null, entry: object }>} candidates
 * @param {(a: any, b: any) => number} stricter - negative when a is stricter
 */
function strictest(candidates, stricter) {
  const set = candidates.filter((c) => c.value !== null && c.value !== undefined);
  if (!set.length) return null;
  const best = set.reduce((a, b) => (stricter(a.value, b.value) <= 0 ? a : b));
  return { value: best.value, sources: set.filter((c) => stricter(c.value, best.value) === 0) };
}

const lower = (a, b) => a - b;
const laterStart = (a, b) => minutes('time', b) - minutes('time', a);
const earlierEnd = (a, b) => minutes('time', a) - minutes('time', b);

/**
 * The citation a breach names: the band's (or entry's) own sources.
 * @param {{ layer: string, band: object|null, entry: object|null }} source
 */
function cite(source) {
  const from = source.band || source.entry;
  const citations = from.citations || (from.citation ? [{ citation: from.citation, sourceUrl: from.sourceUrl }] : []);
  return {
    jurisdiction: source.layer,
    citations,
    confidence: from.confidence,
    note: from.note || null,
  };
}

/**
 * Every limit that applies to a worker of `age` on `date` in `code`, federal
 * and state combined, each with the law it comes from. null when the place is
 * not covered or a layer has no rule in force on that date.
 *
 * @param {string | { country: string, subdivision?: string }} jurisdiction
 * @param {{ age: number, on: string }} opts
 * @returns {object | null}
 */
function rulesFor(jurisdiction, { age, on }) {
  const code = normalizeJurisdiction(jurisdiction);
  parseDate('on', on);
  if (!Number.isInteger(age) || age < 0) throw new TypeError(`age must be a whole number of years, got ${describe(age)}`);
  const layers = layersFor(code);
  if (!layers || !layers.every((l) => inForce(l, on))) return null;
  const year = Number(on.slice(0, 4));
  const per = layers.map((layer) => ({ layer, entry: TABLES[layer], band: age >= ADULT_AGE ? null : bandFor(layer, age) }));
  const pick = (read) => per.map((p) => ({ ...p, value: read(p) }));
  const field = (read, cmp) => {
    const r = strictest(pick(read), cmp);
    return r && { value: r.value, sources: r.sources.map(cite) };
  };
  return {
    jurisdiction: code,
    age,
    on,
    minimumAge: field((p) => (p.entry.minimumAge ? p.entry.minimumAge.age : null), (a, b) => b - a),
    workPermitRequiredUnder: field((p) => (p.entry.workPermit ? p.entry.workPermit.requiredUnder : null), (a, b) => b - a),
    maxHoursSchoolDay: field((p) => p.band && p.band.maxHours.schoolDay, lower),
    maxHoursNonSchoolDay: field((p) => p.band && p.band.maxHours.nonSchoolDay, lower),
    maxHoursSchoolWeek: field((p) => p.band && p.band.maxHours.schoolWeek, lower),
    maxHoursNonSchoolWeek: field((p) => p.band && p.band.maxHours.nonSchoolWeek, lower),
    maxHoursSchoolDayIncludingSchool: field((p) => p.band && p.band.maxHours.schoolDayIncludingSchool, lower),
    maxDaysPerWeek: field((p) => p.band && p.band.maxDaysPerWeek, lower),
    noWorkDuringSchoolHours: per.some((p) => p.band && p.band.noWorkDuringSchoolHours),
    summer: per.filter((p) => p.band && p.band.window.summer).map((p) => ({
      jurisdiction: p.layer,
      from: seasonDate(p.band.window.summer.from, year),
      to: seasonDate(p.band.window.summer.to, year),
      latestEnd: p.band.window.summer.latestEnd,
    })),
    mealBreaks: per.filter((p) => p.band && p.band.mealBreak).map((p) => ({ ...p.band.mealBreak, ...cite(p) })),
    personalCareNotes: per.filter((p) => p.entry.personalCareNote).map((p) => ({ jurisdiction: p.layer, note: p.entry.personalCareNote })),
  };
}

// ── Checking a schedule ──────────────────────────────────────────────

/**
 * @param {unknown} fn
 * @param {string} name
 * @param {(date: string) => boolean} fallback
 * @returns {(date: string) => boolean}
 */
function predicate(fn, name, fallback) {
  if (fn === undefined) return fallback;
  if (typeof fn === 'function') return (d) => fn(d) === true;
  if (Array.isArray(fn) || fn instanceof Set) {
    const set = new Set(fn);
    return (d) => set.has(d);
  }
  throw new TypeError(`${name} must be a function (date) => boolean, an array of dates, or a Set`);
}

/**
 * Read and check one shift.
 * @param {unknown} s
 * @param {number} i
 */
function readShift(s, i) {
  if (!s || typeof s !== 'object') throw new TypeError(`shifts[${i}] must be an object`);
  parseDate(`shifts[${i}].date`, s.date);
  const start = minutes(`shifts[${i}].start`, s.start);
  let end = minutes(`shifts[${i}].end`, s.end);
  if (end <= start) end += 24 * 60; // ends after midnight
  const breakMinutes = s.breakMinutes === undefined || s.breakMinutes === null ? 0 : s.breakMinutes;
  if (!Number.isFinite(breakMinutes) || breakMinutes < 0 || breakMinutes >= end - start) {
    throw new TypeError(`shifts[${i}].breakMinutes must be 0 or more and shorter than the shift`);
  }
  return { index: i, id: s.id, date: s.date, start, end, breakMinutes, worked: end - start - breakMinutes };
}

/**
 * Check a worker's shifts against every limit that applies to them.
 *
 * @param {object} input
 * @param {string | { country: string, subdivision?: string }} input.jurisdiction - where the work is done
 * @param {string} input.birthDate - 'YYYY-MM-DD'
 * @param {Array<{ date: string, start: string, end: string, breakMinutes?: number, id?: unknown }>} input.shifts
 *   every shift in the weeks being checked (a weekly limit sees only what you pass)
 * @param {((date: string) => boolean) | string[] | Set<string>} [input.schoolDays]
 *   days school is in session. Default: every Monday to Friday, the strictest reading.
 * @param {((date: string) => boolean) | string[] | Set<string>} [input.vacationDays]
 *   days of a school vacation, for the rules that loosen then. Default: none.
 * @param {{ start: string, end: string }} [input.schoolHours] - default 07:00–15:00
 * @param {number} [input.weekStartsOn] - the employer's fixed workweek, 0 = Sunday (default) … 6
 * @param {boolean} [input.hasWorkPermit] - false reports a missing permit as a breach;
 *   omitted, a required permit is listed in `requirements`
 * @returns {object}
 */
function checkSchedule(input) {
  if (!input || typeof input !== 'object') throw new TypeError('checkSchedule takes an options object');
  const code = normalizeJurisdiction(input.jurisdiction);
  parseDate('birthDate', input.birthDate);
  if (!Array.isArray(input.shifts)) throw new TypeError('shifts must be an array');
  const weekStartsOn = input.weekStartsOn === undefined ? 0 : input.weekStartsOn;
  if (!Number.isInteger(weekStartsOn) || weekStartsOn < 0 || weekStartsOn > 6) throw new TypeError('weekStartsOn must be 0 (Sunday) to 6 (Saturday)');
  const assumptions = [];
  const vacation = predicate(input.vacationDays, 'vacationDays', () => false);
  const schoolBase = predicate(input.schoolDays, 'schoolDays', (d) => { const w = weekday(d); return w >= 1 && w <= 5; });
  if (input.schoolDays === undefined) assumptions.push('school_days_default_weekdays');
  const isSchool = (d) => schoolBase(d) && !vacation(d);
  let schoolHours = input.schoolHours;
  if (schoolHours === undefined) { schoolHours = DEFAULT_SCHOOL_HOURS; }
  const schoolStart = minutes('schoolHours.start', schoolHours.start);
  const schoolEnd = minutes('schoolHours.end', schoolHours.end);
  if (schoolEnd <= schoolStart) throw new TypeError('schoolHours.end must be after schoolHours.start');
  const shifts = input.shifts.map(readShift);

  const result = { jurisdiction: code, known: true, violations: [], requirements: [], notes: [], assumptions };
  const minorShifts = shifts.filter((s) => ageOn(input.birthDate, s.date) < ADULT_AGE);
  if (!minorShifts.length) return result;
  if (!layersFor(code)) return { ...result, known: false, reason: 'unknown_jurisdiction' };
  const outOfForce = minorShifts.find((s) => !layersFor(code).every((l) => inForce(l, s.date)));
  if (outOfForce) return { ...result, known: false, reason: 'no_rule_in_force', date: outOfForce.date };

  const breach = (rule, fields, source, message) => {
    result.violations.push({ rule, ...fields, ...source.sources[0], alsoSetBy: source.sources.slice(1).map((s) => s.jurisdiction), message });
  };
  const usedSchoolHours = { flag: false };
  const notesSeen = new Set();
  const permitsSeen = new Set();

  // Per shift and per day.
  const byDate = new Map();
  for (const s of minorShifts) {
    const age = ageOn(input.birthDate, s.date);
    const rules = rulesFor(code, { age, on: s.date });
    const day = { date: s.date, schoolToday: isSchool(s.date), schoolTomorrow: isSchool(addDays(s.date, 1)), vacationToday: vacation(s.date) };
    if (!byDate.has(s.date)) byDate.set(s.date, { shifts: [], rules, day, age });
    byDate.get(s.date).shifts.push(s);

    for (const n of rules.personalCareNotes) if (!notesSeen.has(n.jurisdiction)) { notesSeen.add(n.jurisdiction); result.notes.push(n); }

    if (rules.minimumAge && age < rules.minimumAge.value) {
      breach('below_minimum_age', { date: s.date, shift: s.index, id: s.id, limit: rules.minimumAge.value, actual: age }, rules.minimumAge,
        `At ${age}, this worker is below the minimum working age of ${rules.minimumAge.value}`);
    }
    if (rules.workPermitRequiredUnder && age < rules.workPermitRequiredUnder.value) {
      const key = rules.workPermitRequiredUnder.value;
      if (input.hasWorkPermit === false) {
        breach('work_permit_missing', { date: s.date, shift: s.index, id: s.id, limit: key, actual: age }, rules.workPermitRequiredUnder,
          `A work permit is required for a worker under ${key}`);
      } else if (input.hasWorkPermit === undefined && !permitsSeen.has(key)) {
        permitsSeen.add(key);
        result.requirements.push({ rule: 'work_permit', requiredUnder: key, ...rules.workPermitRequiredUnder.sources[0] });
      }
    }

    // The window: each layer's own (seasonal rules included), then the stricter.
    const per = layersFor(code).map((layer) => ({ layer, entry: TABLES[layer], band: bandFor(layer, age) })).filter((p) => p.band);
    const starts = strictest(per.map((p) => ({ ...p, value: windowFor(p.band, day).earliest })), laterStart);
    const ends = strictest(per.map((p) => ({ ...p, value: windowFor(p.band, day).latest })), earlierEnd);
    if (starts && s.start < minutes('earliest', starts.value)) {
      breach('starts_too_early', { date: s.date, shift: s.index, id: s.id, limit: starts.value, actual: clock(s.start) }, { sources: starts.sources.map(cite) },
        `Starts at ${clock(s.start)}; a worker of ${age} may not start before ${clock(minutes('t', starts.value))} on this day`);
    }
    if (ends && s.end > minutes('latest', ends.value)) {
      breach('ends_too_late', { date: s.date, shift: s.index, id: s.id, limit: ends.value, actual: clock(s.end) }, { sources: ends.sources.map(cite) },
        `Ends at ${clock(s.end)}; a worker of ${age} may not work past ${clock(minutes('t', ends.value))} ${day.schoolTomorrow ? 'before a school day' : 'on this day'}`);
    }
    if (rules.noWorkDuringSchoolHours && day.schoolToday && s.start < schoolEnd && s.end > schoolStart) {
      usedSchoolHours.flag = true;
      const src = per.filter((p) => p.band.noWorkDuringSchoolHours).map(cite);
      breach('during_school_hours', { date: s.date, shift: s.index, id: s.id, limit: `${clock(schoolStart)}–${clock(schoolEnd)}`, actual: `${clock(s.start)}–${clock(s.end)}` }, { sources: src },
        `A worker of ${age} may not work during school hours on a school day`);
    }
    for (const mb of rules.mealBreaks) {
      if (s.end - s.start > mb.afterHours * 60 && s.breakMinutes < mb.minutes) {
        breach('meal_break', { date: s.date, shift: s.index, id: s.id, limit: mb.minutes, actual: s.breakMinutes }, { sources: [cite({ layer: mb.jurisdiction, band: { citations: mb.citations, confidence: mb.confidence, note: mb.note } })] },
          `A shift longer than ${mb.afterHours} hours needs a ${mb.minutes}-minute break`);
      }
    }
  }

  for (const [date, { shifts: dayShifts, rules, day, age }] of byDate) {
    const worked = dayShifts.reduce((t, s) => t + s.worked, 0);
    const cap = day.schoolToday ? rules.maxHoursSchoolDay : rules.maxHoursNonSchoolDay;
    if (cap && worked > cap.value * 60) {
      breach(day.schoolToday ? 'max_hours_school_day' : 'max_hours_non_school_day', { date, limit: cap.value, actual: worked / 60 }, cap,
        `${worked / 60} hours on ${day.schoolToday ? 'a school day' : 'a day without school'}; the limit at ${age} is ${cap.value}`);
    }
    const withSchool = rules.maxHoursSchoolDayIncludingSchool;
    if (withSchool && day.schoolToday) {
      usedSchoolHours.flag = true;
      const total = worked + (schoolEnd - schoolStart);
      if (total > withSchool.value * 60) {
        breach('max_hours_including_school', { date, limit: withSchool.value, actual: total / 60 }, withSchool,
          `${worked / 60} hours of work plus ${(schoolEnd - schoolStart) / 60} of school is more than ${withSchool.value} in a day`);
      }
    }
  }

  // Per week. A week's limits are the youngest age worked that week, the stricter.
  const weeks = new Map();
  for (const s of minorShifts) {
    const key = weekStart(s.date, weekStartsOn);
    if (!weeks.has(key)) weeks.set(key, []);
    weeks.get(key).push(s);
  }
  for (const [start, weekShifts] of weeks) {
    const first = weekShifts.reduce((a, b) => (a.date <= b.date ? a : b));
    const age = ageOn(input.birthDate, first.date);
    const rules = rulesFor(code, { age, on: first.date });
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const schoolWeek = days.some(isSchool);
    const worked = weekShifts.reduce((t, s) => t + s.worked, 0);
    const cap = schoolWeek ? rules.maxHoursSchoolWeek : rules.maxHoursNonSchoolWeek;
    if (cap && worked > cap.value * 60) {
      breach(schoolWeek ? 'max_hours_school_week' : 'max_hours_non_school_week', { week: start, limit: cap.value, actual: worked / 60 }, cap,
        `${worked / 60} hours in ${schoolWeek ? 'a school week' : 'a week without school'}; the limit at ${age} is ${cap.value}`);
    }
    const daysWorked = new Set(weekShifts.map((s) => s.date)).size;
    if (rules.maxDaysPerWeek && daysWorked > rules.maxDaysPerWeek.value) {
      breach('max_days_per_week', { week: start, limit: rules.maxDaysPerWeek.value, actual: daysWorked }, rules.maxDaysPerWeek,
        `${daysWorked} days in one week; the limit at ${age} is ${rules.maxDaysPerWeek.value}`);
    }
  }

  if (usedSchoolHours.flag && input.schoolHours === undefined) assumptions.push('school_hours_default_07_15');
  return result;
}

/**
 * The jurisdictions the tables cover, with the date they were checked.
 * @returns {{ asOf: string, jurisdictions: string[] }}
 */
function coverage() {
  return { asOf: AS_OF, jurisdictions: ['US', ...STATES] };
}

module.exports = { checkSchedule, rulesFor, coverage, normalizeJurisdiction, AS_OF, ADULT_AGE, DEFAULT_SCHOOL_HOURS };

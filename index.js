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
const { parseDate, addDays, weekday, weekStart, ageOn, seasonDate, minutes, clock, describe, zoneFormat, instantOf } = require('./dates');

const TABLES = deepFreeze(RAW);
const ADULT_AGE = 18;
const STATES = Object.keys(TABLES).filter((c) => c.startsWith('US-')).sort();

/** The school hours assumed when the caller gives none: a guess, reported in `assumptions` whenever a rule uses it. */
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
    let sub = typeof input.subdivision === 'string' ? input.subdivision.trim().toUpperCase() : '';
    if (sub.startsWith(`${country}-`)) sub = sub.slice(country.length + 1); // ISO 3166-2 'US-CA' as given
    code = sub ? `${country}-${sub}` : country;
  }
  if (!code || !/^[A-Z]{2}(-[A-Z0-9]{1,3})?$/.test(code)) {
    throw new TypeError(`jurisdiction must be an ISO 3166 code like 'US-CA', got ${describe(input)}`);
  }
  return code;
}

/**
 * The layers of law that apply in a place, outermost first: US federal law,
 * then the state's ('US' alone is federal law only). null when the tables do
 * not cover the place.
 * @param {string} code
 * @returns {string[] | null}
 */
function layersFor(code) {
  if (code === 'US') return ['US'];
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
  const from = seasonDate(summer.from, year); const to = seasonDate(summer.to, year);
  // A window that crosses the new year ('12-15' to '01-05') is two pieces.
  return from <= to ? date >= from && date <= to : date >= from || date <= to;
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
  // end (and earlier start) is what that law allows. An extension's
  // earliestStart null leaves the school-year start as is; its latestEnd null
  // means that law sets no end time then.
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
    const starts = extensions.map((e) => (e.earliestStart == null ? earliest : e.earliestStart));
    earliest = starts.includes(null) ? null : starts.reduce((a, b) => (minutes('earliestStart', a) <= minutes('earliestStart', b) ? a : b));
  }
  return { earliest, latest };
}

// ── Combining layers: the stricter rule wins ─────────────────────────

/**
 * One limit from each layer, combined: the binding value and every layer
 * that sets it.
 * @param {Array<{ layer: string, value: any, from: any }>} candidates
 * @param {(a: any, b: any) => number} stricter - negative when a is stricter
 * @returns {{ value: any, sources: Array<{ layer: string, from: any }> } | null}
 */
function strictest(candidates, stricter) {
  const set = candidates.filter((c) => c.value !== null && c.value !== undefined);
  if (!set.length) return null;
  const best = set.reduce((a, b) => (stricter(a.value, b.value) <= 0 ? a : b));
  return { value: best.value, sources: set.filter((c) => stricter(c.value, best.value) === 0) };
}

const lower = (a, b) => a - b;
const higher = (a, b) => b - a;
const laterStart = (a, b) => minutes('time', b) - minutes('time', a);
const earlierEnd = (a, b) => minutes('time', a) - minutes('time', b);

/**
 * The law behind a value, from the rule it was read from: an entry-level rule
 * (minimum age, work permit: one citation) or a band (a list).
 * @param {string} layer
 * @param {any} from - a table rule; any because two shapes are read
 * @returns {{ jurisdiction: string, citations: Array<{ citation: string, sourceUrl: string }>, confidence: string, note: string | null }}
 */
function cite(layer, from) {
  const citations = from.citations || [{ citation: from.citation, sourceUrl: from.sourceUrl }];
  return { jurisdiction: layer, citations, confidence: from.confidence, note: from.note || null };
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
function rulesFor(jurisdiction, opts) {
  if (!opts || typeof opts !== 'object') throw new TypeError(`rulesFor needs { age, on }, got ${describe(opts)}`);
  const { age, on } = opts;
  const code = normalizeJurisdiction(jurisdiction);
  parseDate('on', on);
  if (!Number.isInteger(age) || age < 0) throw new TypeError(`age must be a whole number of years, got ${describe(age)}`);
  const layers = layersFor(code);
  if (!layers || !layers.every((l) => inForce(l, on))) return null;
  const year = Number(on.slice(0, 4));
  const per = layers.map((layer) => ({ layer, entry: TABLES[layer], band: age >= ADULT_AGE ? null : bandFor(layer, age) }));
  /**
   * @param {(p: typeof per[number]) => any} read - the value from one layer
   * @param {(a: any, b: any) => number} cmp
   * @param {(p: typeof per[number]) => any} from - the rule it comes from
   */
  const field = (read, cmp, from) => {
    const r = strictest(per.map((p) => ({ layer: p.layer, value: read(p), from: read(p) == null ? null : from(p) })), cmp);
    return r && { value: r.value, sources: r.sources.map((c) => cite(c.layer, c.from)) };
  };
  const band = (read) => (p) => (p.band ? read(p.band) : null);
  const ofBand = (p) => p.band;
  return {
    jurisdiction: code,
    age,
    on,
    minimumAge: field((p) => (p.entry.minimumAge ? p.entry.minimumAge.age : null), higher, (p) => p.entry.minimumAge),
    workPermitRequiredUnder: field((p) => (p.entry.workPermit ? p.entry.workPermit.requiredUnder : null), higher, (p) => p.entry.workPermit),
    maxHoursSchoolDay: field(band((b) => b.maxHours.schoolDay), lower, ofBand),
    maxHoursNonSchoolDay: field(band((b) => b.maxHours.nonSchoolDay), lower, ofBand),
    maxHoursSchoolWeek: field(band((b) => b.maxHours.schoolWeek), lower, ofBand),
    maxHoursNonSchoolWeek: field(band((b) => b.maxHours.nonSchoolWeek), lower, ofBand),
    maxHoursSchoolDayIncludingSchool: field(band((b) => b.maxHours.schoolDayIncludingSchool), lower, ofBand),
    maxDaysPerWeek: field(band((b) => b.maxDaysPerWeek), lower, ofBand),
    maxConsecutiveDays: field(band((b) => b.maxConsecutiveDays), lower, ofBand),
    maxHoursIn24h: field(band((b) => b.maxHoursIn24h), lower, ofBand),
    noWorkDuringSchoolHours: per.some((p) => p.band && p.band.noWorkDuringSchoolHours),
    summer: per.filter((p) => p.band && p.band.window.summer).map((p) => ({
      jurisdiction: p.layer,
      from: seasonDate(p.band.window.summer.from, year),
      to: seasonDate(p.band.window.summer.to, year),
      latestEnd: p.band.window.summer.latestEnd,
    })),
    mealBreaks: per.filter((p) => p.band && p.band.mealBreak).map((p) => ({ ...p.band.mealBreak, ...cite(p.layer, p.band) })),
    personalCareNotes: per.filter((p) => p.entry.personalCareNote).map((p) => ({ jurisdiction: p.layer, note: p.entry.personalCareNote })),
  };
}

// ── Reading the input ────────────────────────────────────────────────

const OPTIONS = ['jurisdiction', 'birthDate', 'shifts', 'schoolDays', 'vacationDays', 'schoolHours', 'weekStartsOn', 'hasWorkPermit', 'timeZone'];
const SHIFT_KEYS = ['date', 'start', 'end', 'breaks', 'breakMinutes', 'id'];
const DAY = 24 * 60;

/** Round hours for output: 6.333… → 6.33. */
const hours = (mins) => Math.round(mins / 60 * 100) / 100;

/** Minutes after midnight as 'HH:MM', past 24:00 on the tables' own scale ('25:30'). */
const hhmm = (mins) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

/**
 * A set of days: a predicate that must answer true or false, or a list or Set
 * of 'YYYY-MM-DD' strings (each checked).
 * @param {unknown} days
 * @param {string} name
 * @param {(date: string) => boolean} fallback
 * @returns {(date: string) => boolean}
 */
function daySet(days, name, fallback) {
  if (days === undefined) return fallback;
  if (typeof days === 'function') {
    return (d) => {
      const answer = days(d);
      if (typeof answer !== 'boolean') throw new TypeError(`${name}(${JSON.stringify(d)}) must return true or false, got ${describe(answer)}`);
      return answer;
    };
  }
  if (Array.isArray(days) || days instanceof Set) {
    const set = new Set(days);
    for (const d of set) parseDate(`${name} entry`, d);
    return (d) => set.has(d);
  }
  throw new TypeError(`${name} must be a function (date) => boolean, an array of dates, or a Set`);
}

/**
 * Read and check one shift. `start` and `end` stay wall-clock minutes (the
 * time-of-day limits are wall-clock rules). Everything measured in time
 * worked — its length, its breaks, its place on an absolute timeline — is
 * real minutes when the time zone is known.
 * @param {unknown} raw
 * @param {number} i
 * @param {string | undefined} timeZone
 */
function readShift(raw, i, timeZone) {
  const what = `shifts[${i}]`;
  if (!raw || typeof raw !== 'object') throw new TypeError(`${what} must be an object`);
  const s = /** @type {Record<string, any>} */ (raw);
  for (const k of Object.keys(s)) if (!SHIFT_KEYS.includes(k)) throw new TypeError(`${what} has unknown key ${describe(k)}; expected ${SHIFT_KEYS.join(', ')}`);
  const d = parseDate(`${what}.date`, s.date);
  const start = minutes(`${what}.start`, s.start);
  let end = minutes(`${what}.end`, s.end);
  if (start >= DAY || end >= DAY) throw new TypeError(`${what}: start and end are times of day, before 24:00`);
  if (end <= start) end += DAY; // ends after midnight

  // Real minutes from the shift's start for a wall-clock minute on its scale.
  const midnight = Date.UTC(d.year, d.month - 1, d.day) / 60000;
  let origin = midnight + start;
  let real = (w) => w - start;
  if (timeZone) {
    const from = instantOf(`${what}.start`, s.date, start, timeZone, -Infinity);
    origin = from / 60000;
    real = (w, label = `${what}.end`) => (instantOf(label, s.date, w, timeZone, from) - from) / 60000;
  }
  const length = real(end);

  let placed = null;
  if (s.breaks !== undefined) {
    if (!Array.isArray(s.breaks)) throw new TypeError(`${what}.breaks must be an array of { start, minutes }`);
    placed = s.breaks.map((b, j) => {
      const label = `${what}.breaks[${j}]`;
      if (!b || typeof b !== 'object' || !Number.isInteger(b.minutes) || b.minutes <= 0) throw new TypeError(`${label} must be { start: 'HH:MM', minutes: whole minutes above 0 }`);
      let w = minutes(`${label}.start`, b.start);
      if (w >= DAY) throw new TypeError(`${label}.start must be a time of day, before 24:00`);
      if (w < start) w += DAY;
      if (w > end) throw new TypeError(`${label} must lie inside the shift`);
      const at = real(w, `${label}.start`);
      if (at + b.minutes > length) throw new TypeError(`${label} must lie inside the shift`);
      return { at, minutes: b.minutes };
    }).sort((a, b) => a.at - b.at);
    for (let j = 1; j < placed.length; j++) if (placed[j].at < placed[j - 1].at + placed[j - 1].minutes) throw new TypeError(`${what}.breaks must not overlap`);
  }
  const placedTotal = placed ? placed.reduce((t, b) => t + b.minutes, 0) : null;
  if (placed && s.breakMinutes !== undefined && s.breakMinutes !== null && s.breakMinutes !== placedTotal) {
    throw new TypeError(`${what}.breakMinutes (${s.breakMinutes}) does not match its breaks (${placedTotal} minutes)`);
  }
  const breakMinutes = placed ? placedTotal : (s.breakMinutes === undefined || s.breakMinutes === null ? 0 : s.breakMinutes);
  if (!Number.isFinite(breakMinutes) || breakMinutes < 0 || breakMinutes >= length) {
    throw new TypeError(`${what}.breakMinutes must be 0 or more and shorter than the shift`);
  }
  // Work intervals on an absolute timeline: exact where the breaks are
  // placed; otherwise the whole shift at a reduced rate.
  const intervals = [];
  if (placed) {
    let from = 0;
    for (const b of placed) { if (b.at > from) intervals.push([origin + from, origin + b.at, 1]); from = b.at + b.minutes; }
    if (length > from) intervals.push([origin + from, origin + length, 1]);
  } else {
    intervals.push([origin, origin + length, (length - breakMinutes) / length]);
  }
  return {
    index: i, id: s.id, date: s.date, start, end, length, breakMinutes, placed,
    worked: length - breakMinutes, origin, intervals, spread: !placed && breakMinutes > 0,
  };
}

/**
 * Read and check every option.
 * @param {any} input - the caller's options; any until checked here
 */
function readInput(input) {
  if (!input || typeof input !== 'object') throw new TypeError('checkSchedule takes an options object');
  for (const k of Object.keys(input)) if (!OPTIONS.includes(k)) throw new TypeError(`Unknown option ${describe(k)}; expected one of ${OPTIONS.join(', ')}`);
  const code = normalizeJurisdiction(input.jurisdiction);
  parseDate('birthDate', input.birthDate);
  const timeZone = input.timeZone;
  if (timeZone !== undefined) {
    if (typeof timeZone !== 'string') throw new TypeError('timeZone must be a string');
    zoneFormat(timeZone);
  }
  if (input.hasWorkPermit !== undefined && typeof input.hasWorkPermit !== 'boolean') throw new TypeError('hasWorkPermit must be true or false when given');
  const weekStartsOn = input.weekStartsOn === undefined ? 0 : input.weekStartsOn;
  if (!Number.isInteger(weekStartsOn) || weekStartsOn < 0 || weekStartsOn > 6) throw new TypeError('weekStartsOn must be 0 (Sunday) to 6 (Saturday)');
  const schoolHours = input.schoolHours === undefined ? DEFAULT_SCHOOL_HOURS : input.schoolHours;
  if (!schoolHours || typeof schoolHours !== 'object') throw new TypeError("schoolHours must be { start: 'HH:MM', end: 'HH:MM' }");
  const schoolStart = minutes('schoolHours.start', schoolHours.start);
  const schoolEnd = minutes('schoolHours.end', schoolHours.end);
  if (schoolEnd <= schoolStart || schoolEnd > DAY) throw new TypeError('schoolHours.end must be after schoolHours.start, the same day');
  const vacation = daySet(input.vacationDays, 'vacationDays', () => false);
  const schoolBase = daySet(input.schoolDays, 'schoolDays', (d) => { const w = weekday(d); return w >= 1 && w <= 5; });
  if (!Array.isArray(input.shifts)) throw new TypeError('shifts must be an array');
  const shifts = input.shifts.map((s, i) => readShift(s, i, timeZone));
  const byTime = shifts.slice().sort((a, b) => a.origin - b.origin);
  for (let i = 1; i < byTime.length; i++) {
    if (byTime[i].origin < byTime[i - 1].origin + byTime[i - 1].length) throw new TypeError(`shifts[${byTime[i - 1].index}] and shifts[${byTime[i].index}] overlap`);
  }
  for (const s of shifts) if (s.date < input.birthDate) throw new TypeError(`shifts[${s.index}].date is before birthDate`);
  return {
    code, birthDate: input.birthDate, shifts, weekStartsOn, hasWorkPermit: input.hasWorkPermit,
    schoolStart, schoolEnd, schoolHoursGiven: input.schoolHours !== undefined, schoolDaysGiven: input.schoolDays !== undefined,
    isSchool: (d) => schoolBase(d) && !vacation(d), vacation,
  };
}

// ── The checks ───────────────────────────────────────────────────────

/**
 * Does a shift break a meal rule ("no more than N hours of work without a
 * break of M minutes")? A stretch is the time from the shift's start, or the
 * end of a break that long, to the next such break: a shorter break does not
 * end it (the stricter reading). With only a total, the total must cover the
 * fewest breaks that could split the shift into lawful stretches, and the
 * result says the timing was not checked ('unchecked').
 * @param {{ placed: Array<{ at: number, minutes: number }> | null, length: number, breakMinutes: number }} s
 * @param {{ afterHours: number, minutes: number, op: string }} mb
 * @returns {null | 'unchecked' | { fields: object, message: string }}
 */
function mealFault(s, mb) {
  const limit = mb.afterHours * 60;
  const tooLong = (mins) => (mb.op === '>=' ? mins >= limit : mins > limit);
  const rule = mb.op === '>=' ? `a stretch of ${mb.afterHours} hours` : `more than ${mb.afterHours} hours`;
  if (s.placed) {
    let from = 0; let longest = 0;
    for (const b of s.placed) if (b.minutes >= mb.minutes) { longest = Math.max(longest, b.at - from); from = b.at + b.minutes; }
    longest = Math.max(longest, s.length - from);
    if (!tooLong(longest)) return null;
    return { fields: { limit: mb.afterHours, actual: hours(longest) }, message: `${hours(longest)} hours without a ${mb.minutes}-minute break; ${rule} without one is not allowed` };
  }
  let needed = 0;
  while (tooLong((s.length - needed * mb.minutes) / (needed + 1))) needed += 1;
  if (!needed) return null;
  if (s.breakMinutes < needed * mb.minutes) {
    return { fields: { limit: mb.afterHours, actual: hours(s.length) }, message: `A shift of ${hours(s.length)} hours needs ${needed} break${needed === 1 ? '' : 's'} of ${mb.minutes} minutes, so that no stretch is ${rule}; ${s.breakMinutes} minutes given` };
  }
  return 'unchecked';
}

/**
 * Check a worker's shifts against every limit that applies to them.
 *
 * @param {object} input
 * @param {string | { country: string, subdivision?: string }} input.jurisdiction - where the work is done ('US' alone: federal law only)
 * @param {string} input.birthDate - 'YYYY-MM-DD'
 * @param {Array<{ date: string, start: string, end: string, breaks?: Array<{ start: string, minutes: number }>, breakMinutes?: number, id?: unknown }>} input.shifts
 *   every shift in the weeks being checked (a weekly, consecutive-day or 24-hour limit sees only what you pass)
 * @param {((date: string) => boolean) | string[] | Set<string>} [input.schoolDays]
 *   days school is in session. Default: every Monday to Friday, the strictest reading.
 * @param {((date: string) => boolean) | string[] | Set<string>} [input.vacationDays]
 *   days of a school vacation, for the rules that loosen then. Default: none.
 * @param {{ start: string, end: string }} [input.schoolHours] - default 07:00–15:00, a guess: pass the school's
 * @param {number} [input.weekStartsOn] - the employer's fixed workweek, 0 = Sunday (default) … 6
 * @param {boolean} [input.hasWorkPermit] - false reports a missing permit as a breach;
 *   omitted, a required permit is listed in `requirements`
 * @param {string} [input.timeZone] - IANA zone of the workplace: time worked is real time across a daylight-saving change
 * @returns {object}
 */
function checkSchedule(input) {
  const ctx = readInput(input);
  const { code, birthDate } = ctx;
  const result = { jurisdiction: code, known: true, violations: [], requirements: [], notes: [], assumptions: [] };
  if (!layersFor(code)) return { ...result, known: false, reason: 'unknown_jurisdiction' };
  const minor = (s) => ageOn(birthDate, s.date) < ADULT_AGE;
  const minorShifts = ctx.shifts.filter(minor);
  if (!minorShifts.length) return result;
  const outOfForce = minorShifts.find((s) => !layersFor(code).every((l) => inForce(l, s.date)));
  if (outOfForce) return { ...result, known: false, reason: 'no_rule_in_force', date: outOfForce.date };

  const assumed = new Set();
  if (!ctx.schoolDaysGiven) assumed.add('school_days_default_weekdays');
  const breach = (rule, fields, source, message) => {
    result.violations.push({ rule, ...fields, ...source.sources[0], alsoSetBy: source.sources.slice(1).map((x) => x.jurisdiction), message });
  };
  const rules = (age, on) => /** @type {any} */ (rulesFor(code, { age, on }));
  const run = { ctx, result, assumed, breach, rules, minor };
  checkShifts(minorShifts, run);
  checkDays(minorShifts, run);
  checkWeeks(run);
  check24Hours(minorShifts, run);
  checkConsecutiveDays(run);
  result.assumptions.push(...[...assumed]);
  return result;
}

/**
 * Per shift: minimum age, permit, start and end times, school hours, meals.
 * @param {any[]} minorShifts
 * @param {any} run
 */
function checkShifts(minorShifts, { ctx, result, assumed, breach, rules }) {
  const notesSeen = new Set(); const permitsSeen = new Set();
  for (const s of minorShifts) {
    const age = ageOn(ctx.birthDate, s.date);
    const r = rules(age, s.date);
    const day = { date: s.date, schoolToday: ctx.isSchool(s.date), schoolTomorrow: ctx.isSchool(addDays(s.date, 1)), vacationToday: ctx.vacation(s.date) };
    const at = { date: s.date, shift: s.index, id: s.id };

    for (const n of r.personalCareNotes) if (!notesSeen.has(n.jurisdiction)) { notesSeen.add(n.jurisdiction); result.notes.push(n); }
    if (r.minimumAge && age < r.minimumAge.value) {
      breach('below_minimum_age', { ...at, limit: r.minimumAge.value, actual: age }, r.minimumAge,
        `At ${age}, this worker is below the minimum working age of ${r.minimumAge.value}`);
    }
    const permit = r.workPermitRequiredUnder;
    if (permit && age < permit.value && !permitsSeen.has(permit.value)) {
      permitsSeen.add(permit.value);
      if (ctx.hasWorkPermit === false) {
        breach('work_permit_missing', { ...at, limit: permit.value, actual: age }, permit, `A work permit is required for a worker under ${permit.value}`);
      } else if (ctx.hasWorkPermit === undefined) {
        result.requirements.push({ rule: 'work_permit', requiredUnder: permit.value, ...permit.sources[0] });
      }
    }

    // The window: each layer's own (seasonal rules included), then the stricter.
    const per = layersFor(ctx.code).map((layer) => ({ layer, band: bandFor(layer, age) })).filter((p) => p.band);
    const starts = strictest(per.map((p) => ({ layer: p.layer, value: windowFor(p.band, day).earliest, from: p.band })), laterStart);
    const ends = strictest(per.map((p) => ({ layer: p.layer, value: windowFor(p.band, day).latest, from: p.band })), earlierEnd);
    const sourced = (x) => ({ sources: x.sources.map((c) => cite(c.layer, c.from)) });
    if (starts && s.start < minutes('earliest', starts.value)) {
      breach('starts_too_early', { ...at, limit: starts.value, actual: hhmm(s.start) }, sourced(starts),
        `Starts at ${clock(s.start)}; a worker of ${age} may not start before ${clock(minutes('t', starts.value))} on this day`);
    }
    if (ends && s.end > minutes('latest', ends.value)) {
      breach('ends_too_late', { ...at, limit: ends.value, actual: hhmm(s.end) }, sourced(ends),
        `Ends at ${clock(s.end)}; a worker of ${age} may not work past ${clock(minutes('t', ends.value))} ${day.schoolTomorrow ? 'before a school day' : 'on this day'}`);
    }
    if (r.noWorkDuringSchoolHours && day.schoolToday) {
      if (!ctx.schoolHoursGiven) assumed.add('school_hours_default_07_15');
      if (s.start < ctx.schoolEnd && s.end > ctx.schoolStart) {
        breach('during_school_hours', { ...at, limit: `${hhmm(ctx.schoolStart)}–${hhmm(ctx.schoolEnd)}`, actual: `${hhmm(s.start)}–${hhmm(s.end)}` },
          { sources: per.filter((p) => p.band.noWorkDuringSchoolHours).map((p) => cite(p.layer, p.band)) },
          `A worker of ${age} may not work during school hours on a school day`);
      }
    }
    for (const mb of r.mealBreaks) {
      const fault = mealFault(s, mb);
      if (fault === 'unchecked') assumed.add('break_timing_unchecked');
      else if (fault) breach('meal_break', { ...at, ...fault.fields }, { sources: [mb] }, fault.message);
    }
  }
}

/**
 * Per day: hours worked, and school plus work. A shift counts toward the day
 * it starts.
 * @param {any[]} minorShifts
 * @param {any} run
 */
function checkDays(minorShifts, { ctx, assumed, breach, rules }) {
  const byDate = new Map();
  for (const s of minorShifts) byDate.set(s.date, [...(byDate.get(s.date) || []), s]);
  for (const [date, shifts] of byDate) {
    const age = ageOn(ctx.birthDate, date);
    const r = rules(age, date);
    const school = ctx.isSchool(date);
    const worked = shifts.reduce((t, s) => t + s.worked, 0);
    const cap = school ? r.maxHoursSchoolDay : r.maxHoursNonSchoolDay;
    if (cap && worked > cap.value * 60) {
      breach(school ? 'max_hours_school_day' : 'max_hours_non_school_day', { date, limit: cap.value, actual: hours(worked) }, cap,
        `${hours(worked)} hours on ${school ? 'a school day' : 'a day without school'}; the limit at ${age} is ${cap.value}`);
    }
    const withSchool = r.maxHoursSchoolDayIncludingSchool;
    if (withSchool && school) {
      if (!ctx.schoolHoursGiven) assumed.add('school_hours_default_07_15');
      const total = worked + (ctx.schoolEnd - ctx.schoolStart);
      if (total > withSchool.value * 60) {
        breach('max_hours_including_school', { date, limit: withSchool.value, actual: hours(total) }, withSchool,
          `${hours(worked)} hours of work plus ${hours(ctx.schoolEnd - ctx.schoolStart)} of school is more than ${withSchool.value} in a day`);
      }
    }
  }
}

/**
 * Per workweek, for every week with a day worked as a minor: all hours worked
 * that week (any worked after an 18th birthday too), at the youngest age the
 * worker is that week.
 * @param {any} run
 */
function checkWeeks({ ctx, breach, rules, minor }) {
  const weeks = new Map();
  for (const s of ctx.shifts) {
    const key = weekStart(s.date, ctx.weekStartsOn);
    weeks.set(key, [...(weeks.get(key) || []), s]);
  }
  for (const [start, shifts] of weeks) {
    const minors = shifts.filter(minor);
    if (!minors.length) continue;
    const age = Math.max(0, ageOn(ctx.birthDate, start < ctx.birthDate ? ctx.birthDate : start));
    const on = minors.reduce((a, b) => (a.date <= b.date ? a : b)).date;
    const r = rules(age, on);
    const schoolWeek = Array.from({ length: 7 }, (_, i) => addDays(start, i)).some(ctx.isSchool);
    const worked = shifts.reduce((t, s) => t + s.worked, 0);
    const cap = schoolWeek ? r.maxHoursSchoolWeek : r.maxHoursNonSchoolWeek;
    if (cap && worked > cap.value * 60) {
      breach(schoolWeek ? 'max_hours_school_week' : 'max_hours_non_school_week', { week: start, limit: cap.value, actual: hours(worked) }, cap,
        `${hours(worked)} hours in ${schoolWeek ? 'a school week' : 'a week without school'}; the limit at ${age} is ${cap.value}`);
    }
    const days = new Set(shifts.map((s) => s.date)).size;
    if (r.maxDaysPerWeek && days > r.maxDaysPerWeek.value) {
      breach('max_days_per_week', { week: start, limit: r.maxDaysPerWeek.value, actual: days }, r.maxDaysPerWeek,
        `${days} days in one week; the limit at ${age} is ${r.maxDaysPerWeek.value}`);
    }
  }
}

/**
 * Hours in any 24, where a state counts them that way: every window that
 * opens at the start of a minor's shift, over all the shifts passed. Placed
 * breaks are exact; a break given only as a total is spread over its shift.
 * @param {any[]} minorShifts
 * @param {any} run
 */
function check24Hours(minorShifts, { ctx, assumed, breach, rules }) {
  let coveredUntil = -Infinity;
  for (const s of minorShifts.slice().sort((a, b) => a.origin - b.origin)) {
    const age = ageOn(ctx.birthDate, s.date);
    const limit = rules(age, s.date).maxHoursIn24h;
    if (!limit || s.origin < coveredUntil) continue;
    const until = s.origin + DAY;
    let worked = 0;
    for (const x of ctx.shifts) {
      for (const [a, b, rate] of x.intervals) {
        const overlap = Math.max(0, Math.min(b, until) - Math.max(a, s.origin));
        if (overlap && x.spread) assumed.add('break_timing_unchecked');
        worked += overlap * rate;
      }
    }
    if (worked > limit.value * 60) {
      coveredUntil = until;
      breach('max_hours_in_24h', { date: s.date, shift: s.index, id: s.id, limit: limit.value, actual: hours(worked) }, limit,
        `${hours(worked)} hours in the 24 hours from ${clock(s.start)} on ${s.date}; the limit at ${age} is ${limit.value}`);
    }
  }
}

/**
 * Consecutive days worked, across workweeks; reported once per run.
 * @param {any} run
 */
function checkConsecutiveDays({ ctx, breach, rules }) {
  const dates = [...new Set(ctx.shifts.map((s) => s.date))].sort();
  let streak = 0; let reported = false;
  dates.forEach((d, k) => {
    streak = k > 0 && addDays(dates[k - 1], 1) === d ? streak + 1 : 1;
    if (streak === 1) reported = false;
    const age = ageOn(ctx.birthDate, d);
    if (age >= ADULT_AGE) return;
    const limit = rules(age, d).maxConsecutiveDays;
    if (limit && streak > limit.value && !reported) {
      reported = true;
      breach('max_consecutive_days', { date: d, limit: limit.value, actual: streak }, limit,
        `${streak} days in a row by ${d}; the limit at ${age} is ${limit.value}`);
    }
  });
}

/**
 * The jurisdictions the tables cover — federal law ('US') and each state —
 * with the date they were checked.
 * @returns {{ asOf: string, jurisdictions: string[] }}
 */
function coverage() {
  return { asOf: AS_OF, jurisdictions: ['US', ...STATES] };
}

module.exports = { checkSchedule, rulesFor, coverage, normalizeJurisdiction, AS_OF, ADULT_AGE, DEFAULT_SCHOOL_HOURS };

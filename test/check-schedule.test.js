'use strict';

// Mississippi sets no rules of its own for retail and service work, so a
// schedule there is held to the federal FLSA rules alone — the cleanest place
// to pin the evaluator against 29 CFR 570.35.

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkSchedule, rulesFor, coverage, normalizeJurisdiction } = require('..');

// Born 2011-06-15: 15 throughout the 2026-27 school year, 16 on 2027-06-15.
const FIFTEEN = '2011-06-15';
const SIXTEEN = '2010-01-10';
const ADULT = '2000-01-01';

/** Mon 2026-10-12 … Sun 2026-10-18 is a school week (Mon–Fri by default). */
const MON = '2026-10-12';
const SAT = '2026-10-17';

const ms = (shifts, extra = {}) => checkSchedule({ jurisdiction: 'US-MS', birthDate: FIFTEEN, shifts, ...extra });
const rules = (r) => r.violations.map((v) => v.rule).sort();

test('an adult is never checked', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: ADULT, shifts: [{ date: MON, start: '06:00', end: '23:00' }] });
  assert.equal(r.known, true);
  assert.deepEqual(r.violations, []);
});

test('a lawful after-school shift for a 15-year-old passes', () => {
  const r = ms([{ date: MON, start: '15:30', end: '18:30' }]);
  assert.deepEqual(r.violations, []);
});

test('federal: 3 hours on a school day, 8 on a day without school', () => {
  assert.deepEqual(rules(ms([{ date: MON, start: '15:00', end: '18:30' }])), ['max_hours_school_day']);
  assert.deepEqual(rules(ms([{ date: SAT, start: '09:00', end: '17:00' }])), []);
  assert.deepEqual(rules(ms([{ date: SAT, start: '09:00', end: '18:00' }])), ['max_hours_non_school_day']);
});

test('a meal break shortens the hours worked', () => {
  assert.deepEqual(rules(ms([{ date: SAT, start: '09:00', end: '17:30', breakMinutes: 30 }])), []);
});

test('federal: no work before 7 a.m. or after 7 p.m. in the school year', () => {
  const r = ms([{ date: SAT, start: '06:30', end: '09:00' }, { date: '2026-10-16', start: '17:00', end: '19:30' }]);
  assert.deepEqual(rules(r), ['ends_too_late', 'starts_too_early']);
  const late = r.violations.find((v) => v.rule === 'ends_too_late');
  assert.equal(late.jurisdiction, 'US');
  assert.match(late.citations[0].citation, /570\.35/);
});

test('federal: until 9 p.m. from 1 June through Labor Day', () => {
  const summer = { schoolDays: [] };
  assert.deepEqual(rules(ms([{ date: '2026-07-07', start: '13:00', end: '21:00' }], summer)), []);
  assert.deepEqual(rules(ms([{ date: '2026-09-07', start: '13:00', end: '21:00' }], summer)), [], 'Labor Day itself is inside');
  assert.deepEqual(rules(ms([{ date: '2026-09-08', start: '13:00', end: '21:00' }], summer)), ['ends_too_late']);
  assert.deepEqual(rules(ms([{ date: '2026-05-31', start: '13:00', end: '21:00' }], summer)), ['ends_too_late']);
});

test('federal: no work during school hours', () => {
  assert.deepEqual(rules(ms([{ date: MON, start: '12:00', end: '14:00' }])), ['during_school_hours']);
  const told = ms([{ date: MON, start: '14:30', end: '17:00' }], { schoolHours: { start: '08:00', end: '14:15' } });
  assert.deepEqual(rules(told), []);
});

test('the default school hours are reported as an assumption', () => {
  const r = ms([{ date: MON, start: '12:00', end: '14:00' }]);
  assert.ok(r.assumptions.includes('school_hours_default_07_15'));
  assert.ok(r.assumptions.includes('school_days_default_weekdays'));
});

test('federal: 18 hours in a school week, 40 in a week without school', () => {
  const week = ['2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16'].map((date) => ({ date, start: '15:30', end: '18:30' }));
  assert.deepEqual(rules(ms([...week, { date: SAT, start: '10:00', end: '13:00' }])), [], '18 hours exactly');
  const over = ms([...week, { date: SAT, start: '10:00', end: '13:30' }]);
  assert.deepEqual(rules(over), ['max_hours_school_week']);
  assert.equal(over.violations[0].actual, 18.5);

  const summer = { schoolDays: [] };
  const july = ['2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10'].map((date) => ({ date, start: '09:00', end: '17:00' }));
  assert.deepEqual(rules(ms(july, summer)), []);
  assert.deepEqual(rules(ms([...july, { date: '2026-07-11', start: '09:00', end: '10:00' }], summer)), ['max_hours_non_school_week']);
});

test('the workweek is the employer\'s: the same shifts can pass in Sunday weeks and fail in Monday weeks', () => {
  const shifts = [
    { date: '2026-10-12', start: '15:30', end: '18:30' }, // Mon, 3
    { date: '2026-10-17', start: '09:00', end: '17:00' }, // Sat, 8
    { date: '2026-10-18', start: '09:00', end: '17:00' }, // Sun, 8
  ];
  // Sunday weeks: Mon + Sat = 11 | Sun = 8.
  assert.deepEqual(rules(ms(shifts)), []);
  // Monday weeks: Mon + Sat + Sun = 19 in one school week.
  const monday = ms(shifts, { weekStartsOn: 1 });
  assert.deepEqual(rules(monday), ['max_hours_school_week']);
  assert.equal(monday.violations[0].week, '2026-10-12');
});

test('a school vacation week is a week without school', () => {
  const days = ['2026-12-21', '2026-12-22', '2026-12-23'];
  const r = ms(days.map((date) => ({ date, start: '09:00', end: '17:00' })), { vacationDays: days.concat(['2026-12-24', '2026-12-25']) });
  assert.deepEqual(rules(r), []);
});

test('16 and 17: no federal hours limits', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: SIXTEEN, shifts: [{ date: MON, start: '05:00', end: '23:00' }] });
  assert.deepEqual(r.violations, []);
});

test('a birthday mid-schedule: the limits follow the age on each day', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: '2011-10-14', shifts: [
    { date: '2026-10-13', start: '15:00', end: '20:00' }, // 14: breaches
    { date: '2026-10-14', start: '15:00', end: '20:00' }, // 15: breaches
  ] });
  assert.equal(r.violations.filter((v) => v.rule === 'ends_too_late').length, 2);
  const at16 = checkSchedule({ jurisdiction: 'US-MS', birthDate: '2010-10-14', shifts: [
    { date: '2026-10-13', start: '15:00', end: '20:00' }, // 15
    { date: '2026-10-14', start: '15:00', end: '20:00' }, // 16
  ] });
  assert.deepEqual(at16.violations.filter((v) => v.rule === 'ends_too_late').map((v) => v.date), ['2026-10-13']);
});

test('below the federal minimum age', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: '2013-01-01', shifts: [{ date: SAT, start: '10:00', end: '12:00' }] });
  assert.ok(rules(r).includes('below_minimum_age'));
});

test('an unknown place is unknown, never "no limits"', () => {
  const r = checkSchedule({ jurisdiction: 'CA-ON', birthDate: FIFTEEN, shifts: [{ date: MON, start: '15:00', end: '18:00' }] });
  assert.equal(r.known, false);
  assert.equal(r.reason, 'unknown_jurisdiction');
  assert.equal(rulesFor('CA-ON', { age: 15, on: MON }), null);
  assert.equal(checkSchedule({ jurisdiction: 'GB', birthDate: ADULT, shifts: [{ date: MON, start: '09:00', end: '17:00' }] }).known, false,
    'a place outside the tables is unknown, whoever works there');
});

test('a shift past midnight is compared on the 24h+ clock', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: SIXTEEN, shifts: [{ date: SAT, start: '18:00', end: '01:00' }] });
  assert.deepEqual(r.violations, []);
});

test('inputs that are not what they claim throw', () => {
  assert.throws(() => checkSchedule({ jurisdiction: 'US-MS', birthDate: '2011-02-30', shifts: [] }), TypeError);
  assert.throws(() => ms([{ date: MON, start: '9:00', end: '12:00' }]), TypeError);
  assert.throws(() => ms([{ date: MON, start: '09:00', end: '12:00', breakMinutes: 200 }]), TypeError);
  assert.throws(() => ms([], { weekStartsOn: 7 }), TypeError);
  assert.throws(() => normalizeJurisdiction('California'), TypeError);
  assert.throws(() => rulesFor('US', undefined), /rulesFor needs \{ age, on \}/);
  assert.equal(normalizeJurisdiction({ country: 'us', subdivision: 'ca' }), 'US-CA');
});

test('coverage lists federal law and all 51 states and DC', () => {
  const c = coverage();
  assert.equal(c.jurisdictions.length, 52);
  assert.equal(c.jurisdictions[0], 'US');
});

test('rulesFor names the law that binds', () => {
  const r = rulesFor('US-MS', { age: 15, on: MON });
  assert.equal(r.maxHoursSchoolDay.value, 3);
  assert.equal(r.maxHoursSchoolDay.sources[0].jurisdiction, 'US');
});

test('with a time zone, a shift across a daylight-saving change counts real hours', () => {
  // Alaska sets no clock limit at 16-17 but a meal break after 5 hours. Anchorage
  // falls back at 02:00 on 2026-11-01: 22:00 to 03:00 is 6 real hours, not 5.
  const shifts = [{ date: '2026-10-31', start: '22:00', end: '03:00' }];
  const run = (extra) => checkSchedule({ jurisdiction: 'US-AK', birthDate: '2010-01-10', shifts, hasWorkPermit: true, ...extra });
  assert.deepEqual(run({}).violations.map((v) => v.rule), []);
  assert.deepEqual(run({ timeZone: 'America/Anchorage' }).violations.map((v) => v.rule), ['meal_break']);
  assert.throws(() => checkSchedule({ jurisdiction: 'US-TX', birthDate: '2011-06-15', shifts: [{ date: '2026-03-08', start: '02:30', end: '06:00' }], timeZone: 'America/Chicago' }), /does not exist/);
  assert.throws(() => checkSchedule({ jurisdiction: 'US-TX', birthDate: '2011-06-15', shifts: [], timeZone: 'Mars/Olympus' }), /timeZone/);
  assert.throws(() => checkSchedule({ jurisdiction: 'US-TX', birthDate: '2011-06-15', shifts: [], timezone: 'UTC' }), /Unknown option/);
});

// Code review, 2026-10-11.

test('the minimum age and the permit cite their own law, not the hours band', () => {
  const r = rulesFor('US-NY', { age: 15, on: MON });
  assert.notDeepEqual(r.workPermitRequiredUnder.sources[0].citations, rulesFor('US-NY', { age: 15, on: MON }).maxHoursSchoolDay.sources[0].citations);
  const young = checkSchedule({ jurisdiction: 'US-MS', birthDate: '2013-03-01', shifts: [{ date: SAT, start: '10:00', end: '12:00' }] });
  const v = young.violations.find((x) => x.rule === 'below_minimum_age');
  assert.ok(v.citations.length > 0 && v.confidence, 'a breach always names its law');
});

test('a weekly limit uses the youngest age that week, whichever day is worked first', () => {
  // Turns 16 on Wednesday 2026-10-14; four 5-hour shifts from Wednesday are 20 hours in a school week, at 15.
  const shifts = ['2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17'].map((date) => ({ date, start: '16:00', end: '21:00' }));
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: '2010-10-14', shifts });
  assert.ok(r.violations.some((x) => x.rule === 'max_hours_school_week' && x.limit === 18));
});

test('turning 18 mid-week: the hours worked at 18 still count toward that week', () => {
  // New York 16-17: 28 hours in a school week. 8 hours at 17, then 32 at 18.
  const shifts = [{ date: '2026-10-12', start: '14:00', end: '22:00' }, ...['2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17'].map((date) => ({ date, start: '14:00', end: '22:00' }))];
  const r = checkSchedule({ jurisdiction: 'US-NY', birthDate: '2008-10-13', shifts, weekStartsOn: 1, hasWorkPermit: true });
  assert.ok(r.violations.some((x) => x.rule === 'max_hours_school_week'));
});

test('the default school hours are reported whenever a school-hours rule is applied', () => {
  const r = checkSchedule({ jurisdiction: 'US-MS', birthDate: FIFTEEN, shifts: [{ date: MON, start: '15:00', end: '18:00' }] });
  assert.ok(r.assumptions.includes('school_hours_default_07_15'));
  const given = checkSchedule({ jurisdiction: 'US-MS', birthDate: FIFTEEN, shifts: [{ date: MON, start: '15:00', end: '18:00' }], schoolHours: { start: '08:00', end: '15:30' } });
  assert.ok(given.violations.some((x) => x.rule === 'during_school_hours'));
});

test('options are checked, not guessed at', () => {
  const base = { jurisdiction: 'US-MS', birthDate: FIFTEEN, shifts: [{ date: MON, start: '15:00', end: '19:00' }] };
  assert.throws(() => checkSchedule({ ...base, schoolDays: ['10/12/2026'] }), TypeError);
  assert.throws(() => checkSchedule({ ...base, schoolDays: () => 1 }), /true or false/);
  assert.throws(() => checkSchedule({ ...base, hasWorkPermit: 'no' }), /hasWorkPermit/);
  assert.throws(() => checkSchedule({ ...base, schoolHours: null }), /schoolHours/);
  assert.throws(() => checkSchedule({ ...base, shifts: [{ date: MON, start: '15:00', End: '19:00' }] }), /unknown key/);
  assert.throws(() => checkSchedule({ ...base, shifts: [{ date: MON, start: '00:00', end: '29:00' }] }), /before 24:00/);
  assert.throws(() => checkSchedule({ ...base, shifts: [{ date: MON, start: '15:00', end: '19:00' }, { date: MON, start: '18:00', end: '20:00' }] }), /overlap/);
  assert.throws(() => checkSchedule({ ...base, birthDate: '2027-01-01' }), /before birthDate/);
  assert.equal(normalizeJurisdiction({ country: 'US', subdivision: 'US-CA' }), 'US-CA');
});

test('hours in any 24 use the placed breaks', () => {
  // Colorado 16-17: 8 in any 24. Saturday 13:00-15:00, then Sunday 05:00-17:00 with 4 hours off from 13:00:
  // the 24 hours from Saturday 13:00 hold 2 + 8 hours.
  const shifts = [{ date: '2026-10-17', start: '13:00', end: '15:00' }, { date: '2026-10-18', start: '05:00', end: '17:00', breaks: [{ start: '09:00', minutes: 30 }, { start: '13:00', minutes: 210 }] }];
  const r = checkSchedule({ jurisdiction: 'US-CO', birthDate: SIXTEEN, shifts });
  assert.ok(r.violations.some((x) => x.rule === 'max_hours_in_24h' && x.actual === 9.5));
});

test('with a time zone, placed breaks are measured in real time too', () => {
  // Alaska 16-17: no more than 5 hours without 30 minutes. 22:00-04:00 across the fall-back, break at 02:30:
  // 5½ real hours before it.
  const shifts = [{ date: '2026-10-31', start: '22:00', end: '04:00', breaks: [{ start: '02:30', minutes: 30 }] }];
  const r = checkSchedule({ jurisdiction: 'US-AK', birthDate: SIXTEEN, shifts, hasWorkPermit: true, timeZone: 'America/Anchorage' });
  assert.deepEqual(r.violations.map((x) => x.rule), ['meal_break']);
  assert.equal(r.violations[0].actual, 5.5);
});

test('federal law alone: jurisdiction US', () => {
  const r = checkSchedule({ jurisdiction: 'US', birthDate: FIFTEEN, shifts: [{ date: MON, start: '15:00', end: '19:30' }] });
  assert.equal(r.known, true);
  assert.deepEqual(r.violations.map((x) => x.rule).sort(), ['ends_too_late', 'max_hours_school_day']);
});

test('a rule not yet in force answers unknown', () => {
  const r = checkSchedule({ jurisdiction: 'US-WA', birthDate: FIFTEEN, shifts: [{ date: '2026-06-30', start: '10:00', end: '12:00' }] });
  assert.equal(r.known, false);
  assert.equal(r.reason, 'no_rule_in_force');
});

test('a summer window can start on Memorial Day', () => {
  const r = rulesFor('US-MD', { age: 15, on: '2026-05-25' });
  assert.ok(r.summer.some((x) => x.from === '2026-05-25'));
});

test('times are reported on one scale', () => {
  const r = checkSchedule({ jurisdiction: 'US-CA', birthDate: SIXTEEN, shifts: [{ date: SAT, start: '18:00', end: '01:30', breakMinutes: 30 }], hasWorkPermit: true });
  const v = r.violations.find((x) => x.rule === 'ends_too_late');
  assert.equal(v.limit, '24:30');
  assert.equal(v.actual, '25:30');
});

test('the README example runs as shown', () => {
  const r = checkSchedule({ jurisdiction: 'US-NY', birthDate: '2011-06-15', weekStartsOn: 1, shifts: [{ date: '2026-10-12', start: '15:30', end: '19:30', id: 'shift-81' }] });
  assert.deepEqual(r.violations.map((v) => [v.rule, v.limit, v.actual, v.jurisdiction, v.alsoSetBy]), [
    ['ends_too_late', '19:00', '19:30', 'US', ['US-NY']],
    ['max_hours_school_day', 3, 4, 'US', ['US-NY']],
  ]);
  assert.equal(r.requirements[0].requiredUnder, 18);
});

test('every documented name imports through ESM', async () => {
  const mod = await import('../index.js');
  for (const name of ['checkSchedule', 'rulesFor', 'coverage', 'normalizeJurisdiction', 'AS_OF', 'ADULT_AGE', 'DEFAULT_SCHOOL_HOURS']) assert.ok(name in mod, name);
});

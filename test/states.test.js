'use strict';

// Federal and state law together: the stricter limit binds, and the breach
// names the law that set it. These pin the combination rules against a few
// states whose rules differ from the federal ones in instructive ways.

const test = require('node:test');
const assert = require('node:assert/strict');
const { checkSchedule, rulesFor, coverage } = require('..');

const FIFTEEN = '2011-06-15';
const SIXTEEN = '2010-01-10';
const MON = '2026-10-12';
const SAT = '2026-10-17';

const run = (jurisdiction, birthDate, shifts, extra = {}) => checkSchedule({ jurisdiction, birthDate, shifts, ...extra });
const rules = (r) => r.violations.map((v) => v.rule).sort();

test('a looser state does not loosen federal law: Texas lets 14-15 work 8 hours on a school day, the FLSA does not', () => {
  const r = run('US-TX', FIFTEEN, [{ date: MON, start: '15:00', end: '19:00' }]);
  const v = r.violations.find((x) => x.rule === 'max_hours_school_day');
  assert.ok(v);
  assert.equal(v.limit, 3);
  assert.equal(v.jurisdiction, 'US');
});

test('a stricter state binds: New Jersey caps every minor at six days a week', () => {
  const week = ['2026-10-11', '2026-10-12', '2026-10-13', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17']
    .map((date) => ({ date, start: '16:00', end: '20:00' }));
  const r = run('US-NJ', SIXTEEN, week);
  const v = r.violations.find((x) => x.rule === 'max_days_per_week');
  assert.ok(v);
  assert.equal(v.jurisdiction, 'US-NJ');
  assert.equal(v.actual, 7);
});

test('a state meal break: New Jersey, 30 minutes for a shift over six hours', () => {
  assert.deepEqual(rules(run('US-NJ', SIXTEEN, [{ date: SAT, start: '09:00', end: '15:30' }])), ['meal_break']);
  assert.deepEqual(rules(run('US-NJ', SIXTEEN, [{ date: SAT, start: '09:00', end: '15:30', breakMinutes: 30 }])), []);
});

test('California 16-17: until 12:30 a.m. before a day without school, 10 p.m. before a school day', () => {
  assert.deepEqual(rules(run('US-CA', SIXTEEN, [{ date: SAT, start: '17:00', end: '00:30', breakMinutes: 30 }], { hasWorkPermit: true })), []);
  const late = run('US-CA', SIXTEEN, [{ date: '2026-10-13', start: '18:00', end: '22:30', breakMinutes: 0 }], { hasWorkPermit: true });
  assert.deepEqual(rules(late), ['ends_too_late', 'max_hours_school_day']);
});

test('a required work permit is listed, or a breach when the employer says there is none', () => {
  const listed = run('US-CA', SIXTEEN, [{ date: SAT, start: '10:00', end: '14:00' }]);
  assert.equal(listed.requirements.length, 1);
  assert.equal(listed.requirements[0].requiredUnder, 18);
  assert.equal(listed.requirements[0].jurisdiction, 'US-CA');
  const missing = run('US-CA', SIXTEEN, [{ date: SAT, start: '10:00', end: '14:00' }], { hasWorkPermit: false });
  assert.deepEqual(rules(missing), ['work_permit_missing']);
  const held = run('US-CA', SIXTEEN, [{ date: SAT, start: '10:00', end: '14:00' }], { hasWorkPermit: true });
  assert.deepEqual(held.requirements, []);
  assert.deepEqual(held.violations, []);
});

test('Illinois: school plus work may not exceed 8 hours on a school day', () => {
  // 07:00–15:00 is 8 hours of school already; an hour after is too much.
  const r = run('US-IL', FIFTEEN, [{ date: MON, start: '15:30', end: '16:30' }]);
  const v = r.violations.find((x) => x.rule === 'max_hours_including_school');
  assert.ok(v);
  assert.equal(v.jurisdiction, 'US-IL');
  assert.ok(r.assumptions.includes('school_hours_default_07_15'));
  const shortDay = run('US-IL', FIFTEEN, [{ date: MON, start: '15:30', end: '16:30' }], { schoolHours: { start: '08:30', end: '14:30' } });
  assert.ok(!rules(shortDay).includes('max_hours_including_school'));
});

test('a vacation rule follows the school calendar: the last day of a break is still a school night', () => {
  // Kentucky sets no end time for 16-17 when school is out, but 10:30 p.m. before a school day.
  const breakDays = ['2026-12-21', '2026-12-22', '2026-12-23', '2026-12-24', '2026-12-25', '2026-12-26', '2026-12-27', '2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01', '2027-01-02', '2027-01-03'];
  const opts = { vacationDays: breakDays };
  assert.deepEqual(rules(run('US-KY', SIXTEEN, [{ date: '2026-12-22', start: '17:00', end: '24:30', breakMinutes: 30 }], opts)), []);
  assert.deepEqual(rules(run('US-KY', SIXTEEN, [{ date: '2027-01-03', start: '17:00', end: '23:30', breakMinutes: 30 }], opts)), ['ends_too_late']);
});

test('notes about personal-care work travel with the result', () => {
  const r = run('US-CA', FIFTEEN, [{ date: SAT, start: '10:00', end: '12:00' }], { hasWorkPermit: true });
  assert.ok(r.notes.some((n) => n.jurisdiction === 'US-CA' && n.note.length > 0));
});

test('rulesFor answers the combined limits with their sources', () => {
  const r = rulesFor('US-NY', { age: 16, on: MON });
  assert.equal(r.maxHoursSchoolWeek.value, 28);
  assert.equal(r.maxHoursSchoolWeek.sources[0].jurisdiction, 'US-NY');
  assert.equal(r.noWorkDuringSchoolHours, true);
  assert.equal(r.workPermitRequiredUnder.value, 18);
  assert.equal(rulesFor('US-NY', { age: 18, on: MON }).maxHoursSchoolWeek, null);
});

test('every entry is well formed', () => {
  const { JURISDICTIONS } = require('../data');
  const time = /^([01]\d|2[0-5]):[0-5]\d$/;
  for (const code of coverage().jurisdictions) {
    const e = JURISDICTIONS[code];
    assert.ok(e, code);
    for (const b of e.bands) {
      assert.ok(b.minAge <= b.maxAge, code);
      assert.ok(['high', 'medium'].includes(b.confidence), code);
      assert.ok(b.citations.length > 0 && b.citations.every((c) => /^https?:\/\//.test(c.sourceUrl)), `${code} cites`);
      for (const k of ['earliestStartSchoolDay', 'earliestStartNonSchoolDay', 'latestEndBeforeSchoolDay', 'latestEndBeforeNonSchoolDay']) {
        assert.ok(b.window[k] === null || time.test(b.window[k]), `${code} ${k}`);
      }
      for (const ext of [b.window.summer, b.window.vacation].filter(Boolean)) {
        assert.ok(ext.latestEnd === null || time.test(ext.latestEnd), code);
      }
      if (b.window.summer) {
        assert.match(b.window.summer.from, /^(\d{2}-\d{2}|memorial-day)$/, code);
        assert.match(b.window.summer.to, /^(\d{2}-\d{2}|labor-day)$/, code);
      }
    }
  }
});

test('the tables are frozen', () => {
  const { JURISDICTIONS } = require('../data');
  // data.js exports plain objects; the library freezes them on load.
  require('..');
  assert.ok(Object.isFrozen(JURISDICTIONS['US-CA'].bands[0].maxHours));
});

// Review fixes, 2026-10-11: each case passed an unlawful shift before.

test('Michigan 16-17: 11:30 p.m. only on Fridays, Saturdays and in a vacation, so a holiday eve ends at 10:30', () => {
  const thursday = run('US-MI', SIXTEEN, [{ date: '2026-10-15', start: '18:00', end: '23:00' }], { vacationDays: ['2026-10-16'] });
  assert.deepEqual(rules(thursday), ['ends_too_late']);
  assert.equal(thursday.violations[0].limit, '22:30');
  const vacation = run('US-MI', SIXTEEN, [{ date: '2026-10-16', start: '18:00', end: '23:30', breakMinutes: 30 }], { vacationDays: ['2026-10-16', '2026-10-17'] });
  assert.deepEqual(rules(vacation), []);
});

test('Michigan 16-17: a weekly average of 8 hours a day is held as 8 hours a day', () => {
  const r = run('US-MI', SIXTEEN, [{ date: SAT, start: '08:00', end: '17:30', breakMinutes: 30 }]);
  assert.deepEqual(rules(r), ['max_hours_non_school_day']);
  assert.equal(r.violations[0].jurisdiction, 'US-MI');
});

test('Pennsylvania 16-17: no work during school hours', () => {
  const r = run('US-PA', SIXTEEN, [{ date: MON, start: '10:00', end: '14:00' }], { hasWorkPermit: true });
  assert.deepEqual(rules(r), ['during_school_hours']);
});

test('Washington 16-17: the 5 a.m. start is for non-school weeks, not a vacation day in a school week', () => {
  const r = run('US-WA', SIXTEEN, [{ date: MON, start: '05:30', end: '10:00' }], { vacationDays: [MON], hasWorkPermit: true });
  assert.deepEqual(rules(r), ['starts_too_early']);
});

test('New York: the general meal period covers minors, 30 minutes for a shift over six hours', () => {
  assert.deepEqual(rules(run('US-NY', SIXTEEN, [{ date: SAT, start: '09:00', end: '16:00' }], { hasWorkPermit: true })), ['meal_break']);
  assert.deepEqual(rules(run('US-NY', SIXTEEN, [{ date: SAT, start: '09:00', end: '16:30', breakMinutes: 30 }], { hasWorkPermit: true })), []);
});

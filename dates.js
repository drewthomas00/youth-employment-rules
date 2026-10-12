'use strict';

/**
 * Calendar arithmetic on 'YYYY-MM-DD' strings. Every date here is a civil date
 * on the employer's own calendar, so nothing reads the machine's time zone.
 */

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86400000;

/**
 * @param {number} year
 * @returns {boolean}
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Parse a calendar date, refusing anything that is not one.
 * @param {string} what - names the value in the error
 * @param {unknown} value
 * @returns {{ year: number, month: number, day: number }}
 */
function parseDate(what, value) {
  const m = typeof value === 'string' ? ISO_DATE.exec(value) : null;
  if (!m) throw new TypeError(`${what} must be a date string 'YYYY-MM-DD', got ${describe(value)}`);
  const year = Number(m[1]); const month = Number(m[2]); const day = Number(m[3]);
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day) {
    throw new TypeError(`${what} is not a real date: ${value}`);
  }
  return { year, month, day };
}

/**
 * Days since 1970-01-01 for a parsed date.
 * @param {{ year: number, month: number, day: number }} d
 * @returns {number}
 */
function dayNumber(d) {
  return Math.round(Date.UTC(d.year, d.month - 1, d.day) / MS_PER_DAY);
}

/**
 * @param {number} n - days since 1970-01-01
 * @returns {string} 'YYYY-MM-DD'
 */
function fromDayNumber(n) {
  return new Date(n * MS_PER_DAY).toISOString().slice(0, 10);
}

/**
 * @param {string} date - 'YYYY-MM-DD'
 * @param {number} days
 * @returns {string}
 */
function addDays(date, days) {
  return fromDayNumber(dayNumber(parseDate('date', date)) + days);
}

/**
 * Day of the week, 0 = Sunday … 6 = Saturday.
 * @param {string} date
 * @returns {number}
 */
function weekday(date) {
  return (dayNumber(parseDate('date', date)) + 4) % 7; // 1970-01-01 was a Thursday
}

/**
 * The first day of the week `date` falls in.
 * @param {string} date
 * @param {number} weekStartsOn - 0 = Sunday … 6 = Saturday
 * @returns {string}
 */
function weekStart(date, weekStartsOn) {
  return addDays(date, -((weekday(date) - weekStartsOn + 7) % 7));
}

/**
 * Completed years on `on`. A 29 February birthday is reached on 1 March in a
 * common year, as US law generally reads it.
 * @param {string} birthDate
 * @param {string} on
 * @returns {number}
 */
function ageOn(birthDate, on) {
  const b = parseDate('birthDate', birthDate);
  const d = parseDate('date', on);
  let age = d.year - b.year;
  if (d.month < b.month || (d.month === b.month && d.day < b.day)) age -= 1;
  return age;
}

/**
 * The n-th Monday of a month counted from the start, or (n = -1) the last one.
 * @param {number} year
 * @param {number} month - 1-12
 * @param {number} n
 * @returns {string}
 */
function monday(year, month, n) {
  if (n > 0) {
    const first = `${year}-${String(month).padStart(2, '0')}-01`;
    return addDays(first, ((1 - weekday(first) + 7) % 7) + 7 * (n - 1));
  }
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  const last = `${year}-${String(month).padStart(2, '0')}-${days}`;
  return addDays(last, -((weekday(last) - 1 + 7) % 7));
}

/**
 * Resolve a seasonal boundary for a year: 'MM-DD', 'memorial-day' (the last
 * Monday in May) or 'labor-day' (the first Monday in September).
 * @param {string} token
 * @param {number} year
 * @returns {string}
 */
function seasonDate(token, year) {
  if (token === 'memorial-day') return monday(year, 5, -1);
  if (token === 'labor-day') return monday(year, 9, 1);
  return `${year}-${token}`;
}

/**
 * Minutes after midnight of the shift's own day. Hours may run past 23 for a
 * time after midnight ('24:30' is 12:30 a.m. the next morning).
 * @param {string} what
 * @param {unknown} value
 * @returns {number}
 */
function minutes(what, value) {
  const m = typeof value === 'string' ? /^(\d{2}):([0-5]\d)$/.exec(value) : null;
  if (!m || Number(m[1]) > 29) throw new TypeError(`${what} must be a time 'HH:MM', got ${describe(value)}`);
  return Number(m[1]) * 60 + Number(m[2]);
}

/**
 * 'HH:MM' for minutes after midnight, past 24:00 written as the next morning's
 * clock time with "(next day)".
 * @param {number} mins
 * @returns {string}
 */
function clock(mins) {
  const h = Math.floor(mins / 60); const m = mins % 60;
  const text = `${String(h % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  return h >= 24 ? `${text} (next day)` : text;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function describe(value) {
  return typeof value === 'string' ? JSON.stringify(value) : String(value);
}

module.exports = { parseDate, addDays, weekday, weekStart, ageOn, seasonDate, minutes, clock, describe, isLeapYear };

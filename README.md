# youth-employment-rules

[![npm](https://img.shields.io/npm/v/youth-employment-rules)](https://www.npmjs.com/package/youth-employment-rules)
[![CI](https://github.com/drewthomas00/youth-employment-rules/actions/workflows/ci.yml/badge.svg)](https://github.com/drewthomas00/youth-employment-rules/actions/workflows/ci.yml)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](https://www.npmjs.com/package/youth-employment-rules?activeTab=dependencies)
[![node](https://img.shields.io/node/v/youth-employment-rules)](https://www.npmjs.com/package/youth-employment-rules)
[![license](https://img.shields.io/npm/l/youth-employment-rules)](LICENSE)

May a 15-year-old work this shift here?

US child labor hours rules — federal law (the FLSA and 29 CFR Part 570) and all 50 states and DC — as cited, dated data, with a checker that takes a worker's birth date and shifts and answers every breach: hours per school day and per week, start and end times, the summer and school-vacation windows, school hours, meal breaks, days per week, minimum ages and work permits. Each breach names the provision it comes from, with a link.

Pure functions. No network, no runtime dependencies. TypeScript types included.

```sh
npm install youth-employment-rules
```

**Not legal advice, and not reviewed by a lawyer.** The tables are for non-agricultural, non-hazardous work (retail, food service, personal services and the like). They are a first line of defence for a scheduling tool, not a substitute for the employer's own obligations. See [Not legal advice](#not-legal-advice).

## Why this is harder than it looks

**Two laws apply at once, and the stricter one wins on each point.** Texas lets a 15-year-old work 8 hours on a school day; the FLSA says 3. New York lets a 14-year-old work until 7 p.m., or 9 p.m. from 21 June; the FLSA says 9 p.m. from 1 June. The library combines federal and state law limit by limit, and tells you which one bound.

**"School day" is a property of tomorrow as well as today.** Most end-time rules are about the night *before* a school day. Sunday night in term time is a school night; Friday night is not; the last night of a winter break is.

**Seasons are written two ways.** The FLSA's later summer evening runs from 1 June through Labor Day — fixed dates. Many states tie theirs to the school vacation, whenever the district says that is. Both are encoded, and the second follows the school calendar you pass.

**"Unknown" is not "no limits".** A place the tables do not cover answers `known: false`. A tool that schedules minors should treat that as a stop, not a pass.

## Usage

```js
const { checkSchedule } = require('youth-employment-rules');
// or: import { checkSchedule } from 'youth-employment-rules';

checkSchedule({
  jurisdiction: 'US-NY',            // where the work is done
  birthDate: '2011-06-15',          // 15 in October 2026
  weekStartsOn: 1,                  // the employer's fixed workweek (0 = Sunday, the default)
  shifts: [
    { date: '2026-10-12', start: '15:30', end: '19:30', id: 'shift-81' },
  ],
});
// {
//   jurisdiction: 'US-NY',
//   known: true,
//   violations: [
//     { rule: 'ends_too_late', date: '2026-10-12', shift: 0, id: 'shift-81',
//       limit: '19:00', actual: '19:30', jurisdiction: 'US', alsoSetBy: ['US-NY'],
//       citations: [{ citation: '29 CFR § 570.35(a)', sourceUrl: 'https://…' }],
//       confidence: 'high', note: '…',
//       message: 'Ends at 19:30; a worker of 15 may not work past 19:00 before a school day' },
//     { rule: 'max_hours_school_day', … limit: 3, actual: 4 },
//   ],
//   requirements: [{ rule: 'work_permit', requiredUnder: 18, jurisdiction: 'US-NY', … }],
//   notes: [],
//   assumptions: ['school_days_default_weekdays']
// }
```

### Options

| Option | Default | Meaning |
|---|---|---|
| `jurisdiction` | — | `'US-CA'`, or `{ country: 'US', subdivision: 'CA' }` (`'US-CA'` as the subdivision works too). Where the work is done. `'US'` alone checks federal law only. |
| `birthDate` | — | `'YYYY-MM-DD'`. A 29 February birthday is reached on 1 March in a common year. |
| `shifts` | — | `{ date, start, end, breaks?, breakMinutes?, id? }`. `start` and `end` are times of day, `'00:00'`–`'23:59'`; an end at or before the start runs past midnight, and a shift is at most 24 hours. A shift counts toward the day it starts. Shifts may not overlap. `breaks` (`{ start, minutes }`) places unpaid breaks, so a meal rule is checked stretch by stretch and the 24-hour limit counts exactly; with only `breakMinutes`, the total is checked and `assumptions` says `break_timing_unchecked`. Unknown keys throw. Pass every shift in the weeks you check — a weekly, consecutive-day or 24-hour limit sees only what you pass. |
| `schoolDays` | every Monday–Friday | The days school is in session: a function `(date) => boolean`, an array or a Set. The default is the strictest reading, and is reported in `assumptions`. |
| `vacationDays` | none | Days of a school vacation, for the rules that loosen then. A vacation day is never a school day. |
| `schoolHours` | 07:00–15:00 | For the "not during school hours" and "school plus work" rules. The default is a guess, not a strict reading (many schools end later): pass the school's. It is reported in `assumptions` whenever one of those rules was applied. |
| `weekStartsOn` | `0` (Sunday) | The employer's fixed workweek, which weekly limits are counted over. |
| `hasWorkPermit` | — | `false` reports a required permit as a breach; omitted, it is listed in `requirements`. |
| `timeZone` | — | The workplace's IANA zone, e.g. `'America/Chicago'`. Time worked — a shift's length, its stretches between breaks, the 24-hour window — is then real time, so an overnight shift across a daylight-saving change counts the hour it gains or loses. A time that does not exist that day (02:30 when the clocks go forward) throws; a time that happens twice is read as its first occurrence. Without it, time is wall-clock time. |

Shifts worked at 18 or older are not checked themselves: child labor limits stop at 18, whatever the age of majority. A place the tables do not cover answers `known: false` whoever works there. Unknown option names throw.

### Breaches

| `rule` | Per | Meaning |
|---|---|---|
| `below_minimum_age` | shift | Younger than the minimum working age. |
| `work_permit_missing` | shift | A permit is required and `hasWorkPermit` was `false`. |
| `starts_too_early` / `ends_too_late` | shift | Outside the day's window (school-year, summer or vacation). |
| `during_school_hours` | shift | On a school day, overlapping school hours, where the law bars it. |
| `meal_break` | shift | A stretch of work longer than the rule allows without a break of the rule's minutes (with only a total, too little break time for the shift). |
| `max_hours_school_day` / `max_hours_non_school_day` | day | Hours worked that day, breaks excluded. |
| `max_hours_including_school` | day | School hours plus work over the limit. |
| `max_hours_school_week` / `max_hours_non_school_week` | week | A school week is any week with a school day in it. |
| `max_days_per_week` | week | Days worked in the workweek. |
| `max_consecutive_days` | run of days | Days worked in a row, across workweeks (Maine, New Hampshire, Pennsylvania, Hawaii). |
| `max_hours_in_24h` | 24 hours | Hours worked in the 24 hours from the start of a shift (Colorado, Illinois). |

A weekly limit applies to every workweek with a day worked as a minor, at the youngest age the worker is that week, and counts all the hours worked that week, including any after an 18th birthday (the stricter reading). A daily or per-shift limit uses their age that day. A meal rule's stretch runs from the start of the shift, or the end of a break at least as long as the rule's, to the next such break; a shorter break does not end it. Hours in the results are rounded to two decimals; times are `'HH:MM'` on the tables' 24-hour-plus scale (`'25:30'` is 1:30 a.m. the next morning).

### `rulesFor(jurisdiction, { age, on })`

The combined limits for one age on one day, each with its value and the laws that set it, or `null` for a place the tables do not cover:

```js
rulesFor('US-NY', { age: 16, on: '2026-10-12' }).maxHoursSchoolWeek;
// { value: 28, sources: [{ jurisdiction: 'US-NY', citations: [...], confidence: 'high', note: '…' }] }
```

### `coverage()`

`{ asOf, jurisdictions }` — the date the tables were last checked against their sources, and every code they cover.

## How the tables are encoded

- `null` means the jurisdiction was checked and sets no limit there; federal law may still.
- Where a statute's rule depends on something the shape cannot hold — a parent's written consent, a high-school diploma, an industry list, a weekday — the **stricter** reading is encoded and the band's `note` says so. A checker built on these tables will sometimes flag a lawful shift; it should never pass an unlawful one because of the encoding. Known cases include Michigan 14–15 (3 hours on every day of a school week), Pennsylvania 16–17 (8 hours on any day), New Jersey 16–17 (8/40 all year), New York 16–17 (no vacation midnight), Michigan 16–17 (10:30 p.m. on Fridays and Saturdays outside a vacation, and 8 hours a day for the weekly average), Washington 16–17 (no 5 a.m. start on vacation days), and North Carolina 14–15 (whose hours bind only employers outside the FLSA).
- Meal breaks are the rules written for minors (23 states). A state's meal or rest break rule for all employees — California's, New York's, Colorado's and others — applies to minors too, but is not in these tables: check it with [work-break-rules](https://github.com/drewthomas00/work-break-rules).
- Connecticut's minimum age of 16 is its floor for mercantile and other named industries; the band notes say which work it does not reach.
- Times past midnight are written on a 24-hour-plus clock: `'24:30'` is 12:30 a.m. the next morning.
- Every entry has a `confidence`: **high** when the primary text (statute, regulation or official code site) was read; **medium** when only an official summary or a reputable copy of the statute could be reached.

## Coverage

As of 2026-10-11. "Permit" is the age below which a work permit or employment certificate is required (a certificate available only on request is not counted). `effectiveFrom` is set where the current rules took effect on a known recent date; a shift before it answers `known: false`.

| Code | Min. age | Permit | Bands | Confidence | effectiveFrom |
|---|---|---|---|---|---|
| US | 14 | — | 14–15, 16–17 | high |  |
| US-AK | 14 | under 17 | 14–15, 16–17 | high |  |
| US-AL | 14 | under 18 | 14–15, 16–17 | high |  |
| US-AR | 14 | — | 14–15, 16, 17 | medium |  |
| US-AZ | — | — | 14–15, 16–17 | high |  |
| US-CA | 12 | under 18 | 12–13, 14–15, 16–17 | medium |  |
| US-CO | 14 | — | 14–15, 16–17 | medium |  |
| US-CT | 16 | under 18 | 14–15, 16–17 | high |  |
| US-DC | 14 | under 18 | 14–15, 16–17 | high |  |
| US-DE | 14 | under 18 | 14–15, 16–17 | high |  |
| US-FL | 14 | — | 14–15, 16–17 | high |  |
| US-GA | 12 | under 16 | 12–15, 16–17 | high |  |
| US-HI | 14 | under 18 | 14–15, 16–17 | high |  |
| US-IA | 14 | — | 14–15, 16–17 | high | 2023-07-01 |
| US-ID | 14 | — | 14–15, 16–17 | high |  |
| US-IL | 14 | under 16 | 14–15, 16–17 | high | 2025-01-01 |
| US-IN | 14 | — | 14–15, 16–17 | medium | 2025-01-01 |
| US-KS | 14 | under 16 | 14–15, 16–17 | high |  |
| US-KY | 14 | — | 14–15, 16–17 | high |  |
| US-LA | 14 | under 18 | 14–15, 16, 17 | high |  |
| US-MA | 14 | under 18 | 14–15, 16–17 | high, medium |  |
| US-MD | 14 | under 18 | 14–15, 16–17 | high |  |
| US-ME | 14 | under 16 | 14–15, 16, 17 | high |  |
| US-MI | 14 | under 18 | 14–15, 16–17 | high | 2025-04-02 |
| US-MN | 14 | — | 14–15, 16–17 | high |  |
| US-MO | 14 | under 16 | 14–15, 16–17 | high |  |
| US-MS | — | — | 14–15, 16–17 | medium |  |
| US-MT | 14 | — | 14–15, 16–17 | high |  |
| US-NC | 14 | under 18 | 14–15, 16–17 | high |  |
| US-ND | 14 | under 16 | 14–15, 16–17 | high |  |
| US-NE | 14 | under 16 | 14–15, 16–17 | high |  |
| US-NH | 12 | under 16 | 14–15, 16–17 | high |  |
| US-NJ | 14 | under 18 | 14–15, 16–17 | medium |  |
| US-NM | 14 | under 16 | 14–15, 16–17 | high, medium |  |
| US-NV | — | under 14 | 14–15, 16–17 | high | 2025-10-01 |
| US-NY | 14 | under 18 | 14–15, 16–17 | high, medium |  |
| US-OH | 14 | under 18 | 14–15, 16–17 | high |  |
| US-OK | 14 | under 16 | 14–15, 16–17 | high, medium |  |
| US-OR | 14 | under 18 | 14–15, 16–17 | medium |  |
| US-PA | 14 | under 18 | 14–15, 16–17 | high |  |
| US-RI | 14 | under 16 | 14–15, 16–17 | high |  |
| US-SC | 14 | — | 14–15, 16–17 | high |  |
| US-SD | — | — | 0–13, 14–15, 16–17 | high |  |
| US-TN | 14 | — | 14–15, 16–17 | medium |  |
| US-TX | 14 | — | 14–15, 16–17 | high |  |
| US-UT | — | — | 14–15, 16–17 | medium | 2024-05-01 |
| US-VA | 14 | under 16 | 14–15, 16–17 | high |  |
| US-VT | 14 | under 16 | 14–15, 16–17 | high |  |
| US-WA | 14 | under 18 | 14–15, 16–17 | high | 2026-07-01 |
| US-WI | 14 | under 16 | 14–15, 16–17 | high | 2026-06-01 |
| US-WV | 14 | under 16 | 14–15, 16–17 | high |  |
| US-WY | 14 | — | 14–15, 16–17 | high |  |

Federal law covers most employers (any enterprise with $500,000 in annual sales, and many smaller ones through individual coverage). The checker always applies it alongside the state's.

## Known limitations

- **Rules the shape cannot hold are noted, not checked:** Maryland's and Delaware's 8 consecutive hours free of work and school (encoded as a daily cap where it implies one), Kentucky's, Oregon's and Utah's paid rest breaks for minors, conditions that turn on facts the input does not carry (a parent's consent, a diploma, the industry, an employer outside the FLSA). Each is in its band's `note`, and the stricter reading is encoded.
- **Meal timing needs placed breaks.** With only `breakMinutes`, the checker can tell that a shift has too little break time, not that a break came too late or that it was one break rather than several short ones.
- **Without `timeZone`, hours are wall-clock hours.** A shift across a daylight-saving change is off by an hour.
- **School calendars are yours to supply.** The default — every weekday is a school day, and school runs 07:00–15:00 — is the strictest reading and is reported in `assumptions`.
- **Some entries rest on an agency summary or an unofficial copy** (`confidence: 'medium'`); see the coverage table.
- **Not reviewed by a lawyer.**

## How the tables were checked

Each limit's `citations` name the provisions it comes from, and each `sourceUrl` links the text. The tables were compiled with AI-assisted research against those sources, on the date in `AS_OF`, and every jurisdiction was then checked a second time, independently, against the primary text (see [Authorship](#authorship)). **They have not been reviewed by a lawyer.** Where a statute was ambiguous or conditional, the stricter reading is encoded and the `note` says so.

## Not legal advice

Child labor law changes often, at both levels, and several states have rewritten theirs since 2023. This package is a tool to catch mistakes in a schedule; it does not tell an employer that a schedule is lawful. The employer remains responsible for the law that applies to it, including the parts this package does not cover (below). If you find a value that is wrong, please open an issue with the provision and a link.

## Not covered

- Agricultural work, entertainment, newspaper delivery and other occupation-specific regimes.
- Hazardous-occupation lists. States that restrict minors in cosmetology, hair and nail work carry a `personalCareNote`, which the checker returns in `notes`.
- Places outside the United States, and US territories.
- Local ordinances, collective agreements and employer policy.

## Contributing

Every number needs a linkable source. A correction should cite the provision, link the official text if it can be reached, and say what changed and from when. Changes in the law are new `effectiveFrom` dates, not edits that rewrite the past.

The tables are re-checked against their sources every December and June, and after any reported change; `AS_OF` is the date of the last full review, and CI fails once it is more than six months old. See [CONTRIBUTING.md](CONTRIBUTING.md) for what a report or a pull request needs.

## Testing

```sh
npm test
```

Node's built-in test runner, no framework. CI runs the suite on Node 18–26 and again under a non-UTC `TZ`.

## Authorship

This package was written by [Claude](https://www.anthropic.com/claude) (Claude Opus 5.5, Anthropic's AI model), working in Claude Code at the direction of Drew Thomas. Claude wrote the code and the tests and did the research behind the tables. Drew decided what the package should do, and publishes and maintains it. Commits that Claude wrote say so in a `Co-Authored-By` trailer.

## Related packages

- **[work-break-rules](https://github.com/drewthomas00/work-break-rules)** — does this shift give the meal and rest breaks the law requires? US states and DC, for adult employees
- **[age-of-majority](https://github.com/drewthomas00/age-of-majority)** — the age of majority and the digital-consent age by jurisdiction
- **[tcpa-quiet-hours](https://github.com/drewthomas00/tcpa-quiet-hours)** — is it legal to send this marketing message right now, in the recipient's local time
- **[pg-cron-lease](https://github.com/drewthomas00/pg-cron-lease)** — make an in-process cron job a singleton across replicas, using Postgres

## License

MIT © [Drew Thomas](https://drewthomasbuilds.com)

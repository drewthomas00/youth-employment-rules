/**
 * youth-employment-rules — may a worker of this age work this schedule here?
 *
 * NOT LEGAL ADVICE. US federal law (the FLSA child labor rules) and the 50
 * states and DC, for non-agricultural, non-hazardous work. A place the tables
 * do not cover answers unknown, never "no limits".
 */

/** 'high': read in the primary text. 'medium': an official summary or a reputable copy of the statute. */
export type Confidence = 'high' | 'medium';

/** 'US-CA', 'us-ca', or { country: 'US', subdivision: 'CA' }. */
export type JurisdictionInput = string | { country: string; subdivision?: string | null };

/** One provision a rule comes from. */
export interface Citation {
  readonly citation: string;
  readonly sourceUrl: string;
}

/** The law behind a limit. */
export interface Source {
  /** 'US' for federal law, or the state */
  readonly jurisdiction: string;
  readonly citations: readonly Citation[];
  readonly confidence: Confidence;
  readonly note: string | null;
}

/** A combined limit: the binding value, and every law that sets it. */
export interface Limit<T> {
  readonly value: T;
  readonly sources: readonly Source[];
}

/** Every limit for a worker of one age on one day, federal and state combined. */
export interface Rules {
  readonly jurisdiction: string;
  readonly age: number;
  readonly on: string;
  readonly minimumAge: Limit<number> | null;
  readonly workPermitRequiredUnder: Limit<number> | null;
  readonly maxHoursSchoolDay: Limit<number> | null;
  readonly maxHoursNonSchoolDay: Limit<number> | null;
  readonly maxHoursSchoolWeek: Limit<number> | null;
  readonly maxHoursNonSchoolWeek: Limit<number> | null;
  readonly maxHoursSchoolDayIncludingSchool: Limit<number> | null;
  readonly maxDaysPerWeek: Limit<number> | null;
  readonly noWorkDuringSchoolHours: boolean;
  readonly summer: ReadonlyArray<{ jurisdiction: string; from: string; to: string; latestEnd: string }>;
  readonly mealBreaks: ReadonlyArray<Source & { afterHours: number; minutes: number }>;
  readonly personalCareNotes: ReadonlyArray<{ jurisdiction: string; note: string }>;
}

/**
 * Every limit that applies to a worker of `age` on `on` in a place, or null
 * when the tables do not cover it (or hold no rule in force that day).
 */
export function rulesFor(jurisdiction: JurisdictionInput, opts: { age: number; on: string }): Rules | null;

/** One shift. Times are 'HH:MM'; an end at or before the start runs past midnight. */
export interface Shift {
  /** 'YYYY-MM-DD', the day the shift starts */
  date: string;
  start: string;
  end: string;
  /** an unpaid meal break inside the shift, in minutes */
  breakMinutes?: number;
  /** yours, echoed on each breach */
  id?: unknown;
}

/** Days, as a predicate, a list or a Set of 'YYYY-MM-DD'. */
export type DaySet = ((date: string) => boolean) | readonly string[] | ReadonlySet<string>;

export interface CheckScheduleInput {
  /** where the work is done */
  jurisdiction: JurisdictionInput;
  /** 'YYYY-MM-DD' */
  birthDate: string;
  /** every shift in the weeks being checked; a weekly limit sees only what you pass */
  shifts: readonly Shift[];
  /** days school is in session. Default: every Monday to Friday (the strictest reading) */
  schoolDays?: DaySet;
  /** days of a school vacation, for the rules that loosen then. Default: none */
  vacationDays?: DaySet;
  /** Default 07:00–15:00, reported in `assumptions` when used */
  schoolHours?: { start: string; end: string };
  /** the employer's fixed workweek: 0 = Sunday (default) … 6 = Saturday */
  weekStartsOn?: number;
  /** false reports a missing required permit as a breach; omitted, it is listed in `requirements` */
  hasWorkPermit?: boolean;
}

export type RuleId =
  | 'below_minimum_age'
  | 'work_permit_missing'
  | 'starts_too_early'
  | 'ends_too_late'
  | 'during_school_hours'
  | 'meal_break'
  | 'max_hours_school_day'
  | 'max_hours_non_school_day'
  | 'max_hours_including_school'
  | 'max_hours_school_week'
  | 'max_hours_non_school_week'
  | 'max_days_per_week';

/** One breach: the rule, where it bites, and the law that sets it. */
export interface Violation extends Source {
  readonly rule: RuleId;
  /** the day, for a per-shift or per-day rule */
  readonly date?: string;
  /** the first day of the workweek, for a weekly rule */
  readonly week?: string;
  /** the shift's index in `shifts`, and its `id` */
  readonly shift?: number;
  readonly id?: unknown;
  readonly limit: number | string;
  readonly actual: number | string;
  /** other laws that set the same binding limit */
  readonly alsoSetBy: readonly string[];
  readonly message: string;
}

export type Assumption = 'school_days_default_weekdays' | 'school_hours_default_07_15';

export interface CheckResult {
  readonly jurisdiction: string;
  /** false when the tables cannot answer; then `violations` is empty and means nothing */
  readonly known: boolean;
  readonly reason?: 'unknown_jurisdiction' | 'no_rule_in_force';
  /** with reason 'no_rule_in_force': the first day no rule was in force */
  readonly date?: string;
  readonly violations: readonly Violation[];
  /** a work permit the law requires, when `hasWorkPermit` was not given */
  readonly requirements: ReadonlyArray<Source & { rule: 'work_permit'; requiredUnder: number }>;
  /** state notes about personal-care (cosmetology, hair, nail) work */
  readonly notes: ReadonlyArray<{ jurisdiction: string; note: string }>;
  readonly assumptions: readonly Assumption[];
}

/** Check a worker's shifts against every limit that applies to them. Workers 18 and older are not checked. */
export function checkSchedule(input: CheckScheduleInput): CheckResult;

/** The jurisdictions the tables cover, and the date they were checked. */
export function coverage(): { asOf: string; jurisdictions: string[] };

/** 'US-CA' from any accepted spelling; throws TypeError on anything unreadable. */
export function normalizeJurisdiction(input: JurisdictionInput): string;

export const AS_OF: string;
/** Child labor limits stop applying at this age. */
export const ADULT_AGE: 18;
export const DEFAULT_SCHOOL_HOURS: { readonly start: '07:00'; readonly end: '15:00' };

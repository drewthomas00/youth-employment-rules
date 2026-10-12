'use strict';

/**
 * Youth employment rules per US jurisdiction (federal 'US', 50 states, DC)
 * for non-agricultural, non-hazardous retail/service work. Not legal advice.
 * null = checked: this jurisdiction sets no limit there. Each band's `note` says
 * where the encoding is stricter than the law (a rule the shape cannot hold).
 */

const AS_OF = '2026-10-11';

const JURISDICTIONS = {
  "US": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "29 U.S.C. § 203(l); 29 CFR § 570.2(a)(1)(i); 29 CFR Part 570 Subpart C (Reg. 3)",
      "sourceUrl": "https://www.ecfr.gov/current/title-29/section-570.2",
      "confidence": "high",
      "note": "The FLSA's general non-agricultural minimum age is 16; 14- and 15-year-olds may work only in occupations other than manufacturing and mining, within the Reg. 3 (Subpart C) occupation list and the hours limits below. 14 is the floor for non-agricultural, non-hazardous retail/service work. Parent-employing-own-child is exempt (except manufacturing, mining, hazardous). 18 is the minimum for Hazardous Occupations Orders (Subpart E)."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "29 CFR § 570.35(a)",
            "sourceUrl": "https://www.ecfr.gov/current/title-29/section-570.35"
          },
          {
            "citation": "29 U.S.C. § 203(l)",
            "sourceUrl": "https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title29-section203&num=0&edition=prelim"
          }
        ],
        "confidence": "high",
        "note": "School day 3-hour cap includes Fridays. 'School hours' / 'week when school is in session' follow the local public school district where the minor resides (a week counts as a school week if students must attend at least one day or partial day). The 7 p.m. end applies every day of the year outside June 1–Labor Day, not just school nights. Exceptions: WECEP (29 CFR § 570.36) and Work-Study programs (§ 570.37) allow work during school hours and longer school-week hours; minors who have graduated from high school are not bound by school-hours limits. No federal meal-break rule."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "29 U.S.C. § 203(l); 29 CFR § 570.2(a)",
            "sourceUrl": "https://www.ecfr.gov/current/title-29/section-570.2"
          }
        ],
        "confidence": "high",
        "note": "Federal law sets no hours or time-of-day limits for 16- and 17-year-olds; only the Hazardous Occupations Orders (Subpart E) apply."
      }
    ]
  },
  "US-AK": {
    "asOf": "2025-03-26",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Alaska Stat. § 23.10.335",
      "sourceUrl": "https://www.akleg.gov/basis/statutes.asp?media=print&secStart=23.10.325&secEnd=23.10.370",
      "confidence": "high",
      "note": "Under 14 may work only in domestic work/babysitting/handiwork in private homes, newspaper delivery/sales, cannery warehouse can-casing, and (AS 23.10.330(b)) entertainment. A child working under a parent's direct supervision in the parent's own business is exempt from the child labor article (AS 23.10.330(a))."
    },
    "workPermit": {
      "requiredUnder": 17,
      "issuer": "Alaska Department of Labor and Workforce Development, Wage and Hour (employer + parent sign form, employer emails it; approved before work starts)",
      "citation": "Alaska Stat. § 23.10.332; 8 AAC 05.045",
      "sourceUrl": "https://www.akleg.gov/basis/aac.asp?media=print&secStart=8.05.010&secEnd=8.05.990",
      "confidence": "high",
      "note": "Individual permit is per job (new permit for each new job) and the minor may not start until it is approved. Alternative 'general duties' route (AS 23.10.332(c), 8 AAC 05.045(b)-(c)): employer pre-clears specific job duties for an age range, then files the parent's written consent within 7 days of the minor starting (valid for the calendar year). 17-year-olds also need a permit if the employer holds an alcohol license (restaurant designation). Emancipated minors and employers employing only minors in approved work-training/apprenticeship/vocational programs are exempt (8 AAC 05.040(e)-(f))."
    },
    "personalCareNote": "Alaska bars 14-15-year-olds from occupations involving sharpened tools (8 AAC 05.010(14)) and from power-driven machinery other than office machines (8 AAC 05.010(2)); read plainly this reaches shears, razors and clippers, so at 14-15 keep personal-care work to front-desk and cleanup duties. The under-18 bloodborne-pathogens bar (8 AAC 05.115) is limited by its text to hospitals, clinics and medical/dental offices.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": 9,
          "schoolWeek": 23,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": 9
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Alaska Stat. § 23.10.340(a)",
            "sourceUrl": "https://www.akleg.gov/basis/statutes.asp?media=print&secStart=23.10.325&secEnd=23.10.370"
          },
          {
            "citation": "Alaska Stat. § 23.10.350(a)(1), (c)",
            "sourceUrl": "https://www.akleg.gov/basis/statutes.asp?media=print&secStart=23.10.325&secEnd=23.10.370"
          },
          {
            "citation": "8 AAC 05.030",
            "sourceUrl": "https://www.akleg.gov/basis/aac.asp?media=print&secStart=8.05.010&secEnd=8.05.990"
          },
          {
            "citation": "Alaska DOLWD, Summary of Alaska Child Labor Law",
            "sourceUrl": "https://dol.alaska.gov/lss/childlaw.htm"
          }
        ],
        "confidence": "high",
        "note": "Statute caps SCHOOL ATTENDANCE + WORK at 9 hours combined per day (no separate work-only cap on a school day), work only 5 a.m.–9 p.m. every day, and 'employment outside school hours' at 23 hours per week. The 40 h/week figure for school vacations comes from the Department's official summary/work-permit form, not the statute text; the 9-hour non-school-day figure is the statute's combined cap with zero school hours (the permit form's 'eight hours a day' during breaks is a Department statement, not statute). The statute does not expressly bar work during school hours, but 8 AAC 05.030(b) permits work training during school hours only with a written school coordinator/principal statement on file — treat school-hours work as needing that. Break: a minor scheduled 6+ consecutive hours gets a 30-minute break (after the first 1.5 h, before the last hour); one who works 5 consecutive hours without a break gets 30 minutes before continuing; may be modified by CBA or occasional mutual agreement; does not apply to family employers. Approved work-training/apprenticeship enrollees are exempt from the hours limits (8 AAC 05.030(a))."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Alaska Stat. § 23.10.350(a)(1), (b), (c)",
            "sourceUrl": "https://www.akleg.gov/basis/statutes.asp?media=print&secStart=23.10.325&secEnd=23.10.370"
          }
        ],
        "confidence": "high",
        "note": "No daily/weekly hour cap or time-of-day limit outside the entertainment industry. Six days per week maximum, but the commissioner may grant a written exemption for 16–17-year-olds (AS 23.10.350(b)). Same break rule as 14–15 (6+ scheduled hours → 30 min; 5 consecutive hours → 30 min before continuing). 16-year-olds still need a work permit (under 17)."
      }
    ]
  },
  "US-AL": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Ala. Code § 25-8-33(a)",
      "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-33",
      "confidence": "high",
      "note": "No individual under 16 may be employed except in agricultural service and as otherwise provided; 14- and 15-year-olds may work outside school hours and during school vacations, not in manufacturing/mechanical establishments, canneries, mills, workshops, warehouses or machine shops. § 25-8-33(b) exempts 14–15-year-olds in registered youth (pre-)apprenticeship programs and Department of Education-supervised employment."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "Alabama Department of Workforce — the EMPLOYER's annual per-location Class I (ages 14–15) / Class II (ages 16–17) Child Labor Certificate, $15 (not a per-minor permit)",
      "citation": "Ala. Code § 25-8-45",
      "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-45",
      "confidence": "high",
      "note": "Employer-level, like Oregon's: the minor obtains nothing. Act 2024-352 (eff. June 1, 2024) abolished the school-issued 'eligibility to work form' for 14–15-year-olds; employers must instead keep a list of employed 14–15-year-olds, and the parent must notify the school of the employer. Employers keep an Employee Information Form and proof of age for every employee under 19 (§ 25-8-38). The Department revokes a 14–15-year-old's employment if the school reports unsatisfactory attendance/performance."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Ala. Code § 25-8-36(a)",
            "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-36"
          },
          {
            "citation": "Ala. Code § 25-8-37",
            "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-37"
          },
          {
            "citation": "Ala. Code § 25-8-38(e)",
            "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-38"
          }
        ],
        "confidence": "high",
        "note": "During the school session: 7 a.m.-7 p.m., 3 h/school day, 18 h/school week. During SCHOOL SUMMER VACATION: 7 a.m.-9 p.m., 8 h/day, 40 h/week, 6 days (encoded as `vacation`, since the state ties it to the school's vacation, not dates). Meal/rest: no more than 5 hours continuously without a documented 30-minute interval (shorter breaks do not interrupt). A 14-15-year-old whose school attendance was waived may, on superintendent recommendation and inspector approval, work during school hours (8 h/day, 40 h/week, 6 days, 7 a.m.-9 p.m.; § 25-8-37). Minors who completed the secondary course of study are not barred from school-hours work."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ala. Code § 25-8-36(b)",
            "sourceUrl": "https://alison.legislature.state.al.us/code-of-alabama?section=25-8-36"
          }
        ],
        "confidence": "high",
        "note": "Applies only to minors ENROLLED in a public or private primary/secondary school (also enrolled 18-year-olds), and only to the night preceding a school day: no work 10 p.m.-5 a.m. So the 05:00 start binds only school-day mornings and there is no limit on nights before non-school days. The superintendent (or headmaster) may grant individual exemptions. No daily/weekly hour caps."
      }
    ]
  },
  "US-AR": {
    "asOf": "2024-03-28",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Ark. Code Ann. § 11-6-104",
      "sourceUrl": "https://codes.findlaw.com/ar/title-11-labor-and-industrial-relations/ar-code-sect-11-6-104/",
      "confidence": "medium",
      "note": "No child under 14 may be employed, except during school vacations in an occupation owned or controlled by the child's parent or guardian (and entertainment with a permit). Confirmed by the Arkansas Division of Labor child labor page: 'In most cases, a child must be at least fourteen (14) to be employed.' Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ark. Code Ann. § 11-6-108",
            "sourceUrl": "https://codes.findlaw.com/ar/title-11-labor-and-industrial-relations/ar-code-sect-11-6-108/"
          },
          {
            "citation": "Arkansas Division of Labor, Child Labor",
            "sourceUrl": "https://labor.arkansas.gov/labor/labor-standards/child-labor/"
          }
        ],
        "confidence": "medium",
        "note": "The state's limits do not distinguish school vs. non-school days/weeks: 8 hours/day, 48 hours/week, 6 days/week, 6:00 a.m.-7:00 p.m., until 9:00 p.m. on nights preceding non-school days. These are much looser than federal (3/18 school, 40 non-school, 7 a.m.-7 p.m.), which the Division page says 'will remain in effect and will be enforced'. No state school-hours or meal-break rule found. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 16,
        "maxHours": {
          "schoolDay": 10,
          "nonSchoolDay": 10,
          "schoolWeek": 54,
          "nonSchoolWeek": 54,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": "23:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ark. Code Ann. § 11-6-110",
            "sourceUrl": "https://codes.findlaw.com/ar/title-11-labor-and-industrial-relations/ar-code-sect-11-6-110/"
          },
          {
            "citation": "Arkansas Division of Labor, Child Labor (Child Labor Rules, 11 CAR pt. 12)",
            "sourceUrl": "https://labor.arkansas.gov/labor/labor-standards/child-labor/"
          }
        ],
        "confidence": "medium",
        "note": "§ 11-6-110 covers children 'under seventeen', i.e. 16-year-olds only. 10 consecutive hours/day and 10 hours in any 24-hour period, 54 h/week, 6 days, 6 a.m.-11 p.m. On nights preceding a NON-school day a 16-year-old may work past 11 p.m. (to midnight and even midnight-6 a.m.), but NOT in a retail store under 4,500 sq ft, without direct supervision by an adult 21+, in alcohol-serving businesses, truck stops/service stations, as security/delivery, or against a local curfew (Division rule). Because that later window depends on those facts, latestEndBeforeNonSchoolDay is encoded as 23:00 (stricter). The Division measures compliance midnight-to-midnight with a 10-hour rest between shifts for the late-night allowance. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 17,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ark. Code Ann. § 11-6-110 (applies only under 17)",
            "sourceUrl": "https://codes.findlaw.com/ar/title-11-labor-and-industrial-relations/ar-code-sect-11-6-110/"
          }
        ],
        "confidence": "medium",
        "note": "The current statute's hours section stops at 'under seventeen'; the Division page says state law limits hours of minors under 17. The older Division rule (010.14.05-001, Rule 2.501, eff. 2005) still says 'under eighteen' — it predates the statutory change and appears superseded, but this is why confidence is medium."
      }
    ]
  },
  "US-AZ": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": null,
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "21:30",
          "latestEndBeforeNonSchoolDay": "23:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ariz. Rev. Stat. § 23-233",
            "sourceUrl": "https://www.azleg.gov/ars/23/00233.htm"
          },
          {
            "citation": "Ariz. Rev. Stat. § 23-235",
            "sourceUrl": "https://www.azleg.gov/ars/23/00235.htm"
          }
        ],
        "confidence": "high",
        "note": "The statute covers all persons UNDER 16 (no lower bound; Arizona sets no general minimum age; band kept at 14-15 as researched). 'Night' (prohibited) is 9:30 p.m.-6:00 a.m. before a school day and 11:00 p.m.-6:00 a.m. before a non-school day. Week/day caps turn on whether the minor is enrolled and school is in session. Door-to-door solicitation/sales/deliveries are additionally barred from 7:00 p.m. Exempt (§ 23-235): minors employed by a close relative who owns 10%+ and works daily in the business, married minors, minors with a high-school diploma/equivalent, emancipated minors, registered apprentices, career/vocational education participants. No state rule on work during school hours, no meal-break rule, no days-per-week cap."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ariz. Rev. Stat. §§ 23-231, 23-233",
            "sourceUrl": "https://www.azleg.gov/ars/23/00233.htm"
          }
        ],
        "confidence": "high",
        "note": "Arizona sets no hours or time-of-day limits for 16- and 17-year-olds; only the hazardous-occupation list in § 23-231 applies."
      }
    ]
  },
  "US-CA": {
    "asOf": "2021-02-24",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 12,
      "citation": "Cal. Educ. Code § 49111; Cal. Lab. Code § 1391(a)(1)",
      "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf",
      "confidence": "medium",
      "note": "Under 12: no employment except entertainment (Labor Commissioner permit). 12- and 13-year-olds may work, with a permit, ONLY on non-school days (school holidays/vacations, usually construed to include weekends) — never on any school day. 14 is the age for ordinary employment on school days outside school hours. Federal FLSA (14) is stricter for 12–13 in covered enterprises. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school district (superintendent or designee of the minor's school; county superintendent when schools are closed), on a 'Statement of Intent to Employ a Minor and Request for Work Permit' (DLSE B1-1)",
      "citation": "Cal. Educ. Code §§ 49110, 49160-49164; Cal. Lab. Code § 1299",
      "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf",
      "confidence": "medium",
      "note": "Both a Permit to Work (to the minor) and a Permit to Employ (to the employer) are required unless the minor has graduated from high school or holds an equivalent. Permits may set tighter hours than the statute and can be revoked by the school or the Labor Commissioner. Not required for self-employment, newspaper carriers, casual work in private homes, or parent's domestic work. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": "Under-16s may not manufacture or use dangerous dyes, gases or acids (DLSE summary chart; underlying section not read); whether hair dyes and relaxers count is unsettled, so keep 14-15-year-olds away from chemical services. Performing cosmetology or barbering services also requires a Board of Barbering and Cosmetology license or registered apprenticeship.",
    "bands": [
      {
        "minAge": 12,
        "maxAge": 13,
        "maxHours": {
          "schoolDay": 0,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Cal. Educ. Code § 49111; Cal. Lab. Code § 1391(a)(1)",
            "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf"
          }
        ],
        "confidence": "medium",
        "note": "May be employed only on non-school days (maxHours.schoolDay 0 = never on a school day, before, during or after school). School-year maximums are not stated in statute but may not exceed 8/40 or the permit (schoolWeek encoded 40). Not eligible for Work Experience Education. Federal FLSA bars 12-13 from most non-agricultural employment. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Cal. Lab. Code § 1391(a)(1)-(2)",
            "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf"
          },
          {
            "citation": "Cal. Educ. Code §§ 49112, 49116",
            "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf"
          }
        ],
        "confidence": "medium",
        "note": "'Schoolday' = any day the minor is required to attend school for 240 minutes or more (Lab. Code § 1391(b)). 'While school is in session' follows the county public-school calendar (DLSE). Must have completed 7th grade to work while school is in session. Work Experience Education enrollees may work up to 23 h/week, partly during school hours. High-school graduates may work adult hours. California also requires one day's rest in seven for all employees (Lab. Code §§ 551-552), so effectively max 6 days/week (accumulable within a month). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "24:30",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Cal. Lab. Code § 1391(a)(3)-(4)",
            "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf"
          },
          {
            "citation": "Cal. Educ. Code §§ 49112, 49116",
            "sourceUrl": "https://www.dir.ca.gov/dlse/minorssummarycharts.pdf"
          }
        ],
        "confidence": "medium",
        "note": "4 hours on any schoolday, but 8 hours on a non-schoolday OR on any day preceding a non-schoolday (so a Friday may be 8; schoolDay 4 is stricter for Fridays). 48 h/week whether or not school is in session. Work may run until 12:30 a.m. ('24:30') on an evening preceding a non-schoolday. WEE students and personal attendants may exceed 4 h on a schoolday (never more than 8), and WEE students, with permission, may work until 12:30 a.m. on any day (§ 1391.1). Work during school hours is governed by compulsory-attendance law, not a child-labor hours rule. One day's rest in seven applies to all employees. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-CO": {
    "asOf": "2025-05-19",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Colo. Rev. Stat. § 8-12-105(1)",
      "sourceUrl": "https://codes.findlaw.com/co/title-8-labor-and-industry/co-rev-st-sect-8-12-105/",
      "confidence": "medium",
      "note": "Minors under 14 may work only in the duties listed in C.R.S. §§ 8-12-104, -106, -107 (from age 9: handbills, shoeshining, lawn/walk work without power equipment, caddying; from 12: babysitting, periodical and door-to-door sales, non-hazardous agriculture; any age: actors/models/performers, newspaper carriers). The Act's 'minor' excludes anyone under 18 with a high-school diploma or GED (C.R.S. § 8-12-103(5)). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "21:30",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Colo. Rev. Stat. § 8-12-105(2)-(4)",
            "sourceUrl": "https://codes.findlaw.com/co/title-8-labor-and-industry/co-rev-st-sect-8-12-105/"
          },
          {
            "citation": "CDLE Division of Labor Standards and Statistics, INFO #22 Employment of Minors in Colorado (May 19, 2025)",
            "sourceUrl": "https://cdle.colorado.gov/sites/cdle/files/info_%2322_employment_of_minors_in_colorado_05.19.25.pdf"
          }
        ],
        "confidence": "medium",
        "note": "STATE-only limits (CDLE INFO #22 also prints the federal 3 h/18 h/7 a.m.-7 p.m. rules, which are FLSA, not Colorado). After school hours on a school day: at most 6 hours, unless the next day is not a school day (6 is kept as the stricter value). No work 9:30 p.m.-5:00 a.m. when the next day is a school day; Colorado sets NO time-of-day limit on a night before a non-school day (latestEndBeforeNonSchoolDay null = no state rule). Any minor: max 8 hours in any 24-hour period and 40 h/week (the Division may authorize more in an emergency). No work during school hours except with a school release permit under § 8-12-113 (up to 30 days, parent approval). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Colo. Rev. Stat. § 8-12-105(4)",
            "sourceUrl": "https://codes.findlaw.com/co/title-8-labor-and-industry/co-rev-st-sect-8-12-105/"
          },
          {
            "citation": "CDLE INFO #22 (May 19, 2025)",
            "sourceUrl": "https://cdle.colorado.gov/sites/cdle/files/info_%2322_employment_of_minors_in_colorado_05.19.25.pdf"
          }
        ],
        "confidence": "medium",
        "note": "8 hours in any 24-hour period (not per calendar day) and 40 hours per week; CDLE: 'Colorado has a stricter age minimum (18) for weeks over 40 hours, or days over 8'. No time-of-day limits. Does not apply to 16–17-year-olds with a high-school diploma or GED (not 'minors' under the Act). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-CT": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 16,
      "citation": "Conn. Gen. Stat. § 31-23(a)-(b)",
      "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-23",
      "confidence": "high",
      "note": "NOT a blanket floor: Connecticut sets 16 for named industries - manufacturing, mechanical, mercantile, theatrical, restaurants/public dining rooms, bowling alleys, shoe-shining establishments and barber shops. Exceptions: 15-year-olds in mercantile establishments only as bagger/cashier/stock clerk during school vacations of 5+ consecutive days (plus any Saturday in a retail food store), max 8 h/day, 40 h/week, 7 a.m.-7 p.m. (9 p.m. July 1-first Monday in September), and as youth-camp staff or lifeguards; 14-year-olds as golf caddies/pro-shop workers; 14-15 in approved work-study or municipal summer work-recreation programs. Hairdressing/manicuring establishments are not in the § 31-23(a) list (see personalCareNote). For ordinary retail (mercantile) work the floor is effectively 16."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "local/regional school superintendent (or designee) or nonpublic-school supervisory agent — 'working papers' / certificate of age",
      "citation": "Conn. Gen. Stat. §§ 31-23(d), 10-193",
      "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-23",
      "confidence": "high",
      "note": "The EMPLOYER of any minor under 18 must obtain a certificate stating the minor's age and keep it on file at the workplace for Labor Department inspectors. § 10-193 certificates show 16+ (manufacturing, mechanical, theatrical, restaurant, bowling, shoe-shining, barber shop), 15+ (mercantile, youth camp, lifeguard) or 14+ (golf course). Not required for minors employed through a regional workforce development board youth program."
    },
    "personalCareNote": "Conn. Gen. Stat. § 31-18 sets the hours encoded here for any barber shop, hairdressing or manicuring establishment employing a person under 18. § 31-23(a) bars under-16s from barber shops outright, but does not list hairdressing/manicuring establishments; § 31-24 bars under-16s from using dangerous or poisonous gas or dye and from any work requiring continuous standing. So 14-15-year-olds in a hair or nail business should be limited to seated front-desk work, and 16+ is the safe reading for service-floor work.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 8,
          "schoolWeek": 32,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "22:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Conn. Gen. Stat. § 31-18",
            "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-18"
          },
          {
            "citation": "Conn. Gen. Stat. §§ 31-23, 31-24",
            "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-23"
          }
        ],
        "confidence": "high",
        "note": "INDUSTRY-SPECIFIC: these are the § 31-18 limits, which cover barber shops, hairdressing/manicuring establishments, restaurants, amusement/recreation, bowling, shoe-shining, billiards and photo galleries, for every person under 18 there: no work 10 p.m.-6 a.m. on ANY night; 6 hours on a regularly scheduled school day unless it immediately precedes a non-school day (then 8; schoolDay 6 is kept as stricter); 8 hours any other day; 32 h in a week the minor's school is in session, 48 h otherwise. A 14-15-year-old may not work in a BARBER SHOP or (outside the 15-year-old vacation bagger/cashier/stock-clerk exception: 8 h/day, 40 h/week, 7 a.m.-7 p.m., to 9 p.m. July 1-first Monday of September) a MERCANTILE establishment at all - see minimumAge. Under-16s also may not work in any capacity requiring continuous standing or with dangerous/poisonous dyes (§ 31-24). Work-experience hours in approved school programs do not count. Does not apply to high-school graduates. Connecticut's general meal-period law (§ 31-51ii: 30 minutes for 7.5+ consecutive hours) covers all employees and does not fit the afterHours shape, so mealBreak is null."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 8,
          "schoolWeek": 32,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "22:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Conn. Gen. Stat. § 31-18",
            "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-18"
          },
          {
            "citation": "Conn. Gen. Stat. §§ 31-13, 31-14",
            "sourceUrl": "https://www.cga.ct.gov/current/pub/chap_557.htm#sec_31-13"
          }
        ],
        "confidence": "high",
        "note": "INDUSTRY-SPECIFIC: values are the § 31-18 rules for barber shops and hairdressing/manicuring establishments: 10 p.m.-6 a.m. barred every night, 6 h on a school day (8 if it precedes a non-school day; 6 kept as stricter), 8 h other days, 32 h in a school week, 48 h otherwise. Other industries are looser: restaurants/amusement/theaters allow 16-17 until 11 p.m. before school days and midnight otherwise; MERCANTILE (§§ 31-13, 31-14) - enrolled students same 6/8 and 32/48, non-enrolled non-graduates 8 h/day, 6 days, 48 h; 6 a.m.-10 p.m., until 11 p.m. (supermarket over 3,500 sq ft: midnight) on nights not preceding a school day. The encoded values are therefore at least as strict as the retail rule. None of these limits apply to high-school graduates. No minor-specific meal break."
      }
    ]
  },
  "US-DC": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "D.C. Code § 32-201",
      "sourceUrl": "https://code.dccouncil.gov/us/dc/council/code/sections/32-201",
      "confidence": "high",
      "note": "Exceptions: theatrical permits (§ 32-206), housework/agricultural work for a parent at home outside school hours, newspaper distribution from age 10."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school system (Board of Education / DCPS; applied for in person)",
      "citation": "D.C. Code §§ 32-207, 32-208",
      "sourceUrl": "https://code.dccouncil.gov/us/dc/council/code/sections/32-207",
      "confidence": "high",
      "note": "Employer must procure and keep on file a work or vacation permit for every minor under 18 in any gainful occupation, except agricultural work/housework per § 32-201 and irregular casual work at the employer's home unconnected to a business. Not merely an age certificate on request."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "D.C. Code § 32-202",
            "sourceUrl": "https://code.dccouncil.gov/us/dc/council/code/sections/32-202"
          }
        ],
        "confidence": "high",
        "note": "DC sets one daily/weekly cap for all minors under 18 (8 h/day, 48 h/week, 6 consecutive days) with no school-week reduction; the federal FLSA 3 h/18 h school-day/week limits are stricter for 14-15. The 7am-7pm window applies every day (not just school nights); evening cutoff is 9pm June 1 through Labor Day. No state school-hours or meal-break rule found in D.C. Code ch. 32-2 (secondary sources mention a 30-min break after 5 h, not confirmed in statute)."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "22:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "D.C. Code § 32-202",
            "sourceUrl": "https://code.dccouncil.gov/us/dc/council/code/sections/32-202"
          }
        ],
        "confidence": "high",
        "note": "6am-10pm applies on any day, school or not. Limits apply to all minors under 18; no graduate exemption found."
      }
    ]
  },
  "US-DE": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "19 Del. C. § 505",
      "sourceUrl": "https://delcode.delaware.gov/title19/c005/index.html",
      "confidence": "high",
      "note": "'A minor under the age of 14 years shall not be employed or permitted to work.' 'Employment' excludes (§ 502(2)) nonhazardous farm work, domestic work in a private home, nonhazardous work in a parent's business, unpaid volunteering with parental consent, equine activities with consent, golf caddying and newspaper delivery."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "Delaware Department of Labor or a school-district designated issuing officer (middle/high schools); employer must hold a verified and validated employment certificate",
      "citation": "19 Del. C. § 504",
      "sourceUrl": "https://delcode.delaware.gov/title19/c005/index.html",
      "confidence": "high",
      "note": "A minor may not work unless the employer possesses a verified and validated employment certificate, kept on file. Department guidance: a new permit is needed when the minor changes employers; parent/guardian signs for 14–15-year-olds; questions to WorkPermits@Delaware.gov. Same work-permit form for all ages under 18 (Division of Industrial Affairs wage-hour page: 'Required for workers under 18')."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": 12
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "19 Del. C. § 506(a)(1), (b), (c), (d), (e)",
            "sourceUrl": "https://delcode.delaware.gov/title19/c005/index.html"
          },
          {
            "citation": "19 Del. C. § 507(c)-(e)",
            "sourceUrl": "https://delcode.delaware.gov/title19/c005/index.html"
          }
        ],
        "confidence": "high",
        "note": "Delaware allows 4 hours on a school day (federal is 3 - federal is stricter). The 18-hour weekly cap is written for a week 'when school is in session for 5 days'; the statute sets no specific cap for a partial school week (18 kept as stricter). 7 a.m.-7 p.m. every day, to 9 p.m. June 1-Labor Day. No work during the prescribed school day unless excused or in a school-supervised work-study/student-learner program. Also (all under 18): no more than 12 hours of school + work combined per day; at least 8 consecutive hours of non-work, non-school time in each 24-hour day; no more than 5 hours continuously without a non-working period of at least 30 minutes."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": 12
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "19 Del. C. § 507(c)-(e)",
            "sourceUrl": "https://delcode.delaware.gov/title19/c005/index.html"
          },
          {
            "citation": "Delaware DOL Division of Industrial Affairs, Wage & Hour",
            "sourceUrl": "https://industrialaffairs.delaware.gov/wage-hour"
          }
        ],
        "confidence": "high",
        "note": "No daily/weekly caps or clock-time window; instead: max 12 hours of school + work combined per day, at least 8 consecutive hours off (no work, no school) in every 24-hour day — which effectively caps work at 16 hours on a non-school day and forbids e.g. closing at midnight then opening at 7 a.m. — and a 30-minute non-working period after 5 continuous hours."
      }
    ]
  },
  "US-FL": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Fla. Stat. § 450.021(3)",
      "sourceUrl": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0450/Sections/0450.021.html",
      "confidence": "high",
      "note": "\"No person 13 years of age or younger shall be employed...\". Exceptions: newspaper sales from 11, entertainment, legislative pages, some domestic/farm work."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 15,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 4,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Fla. Stat. § 450.081(1), (3), (4)",
            "sourceUrl": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0450/Sections/0450.081.html"
          },
          {
            "citation": "DBPR Child Labor FAQ",
            "sourceUrl": "https://www2.myfloridalicense.com/?p=12052"
          }
        ],
        "confidence": "high",
        "note": "3 h on a school day applies only when school is scheduled the following day (career-education students exempt). The statutory 8 h/day, 40 h/week and 9 p.m. limits are written for holidays and summer vacation; during a school week the statute caps only the week (15 h) - DBPR's poster applies 8 h to Saturdays/Sundays/non-school days. 9 p.m. on holidays/summer (DBPR: June 1-Labor Day) and on nights not followed by school; 7 p.m. when school is scheduled the next day. Meal: no more than 4 continuous hours without a 30-minute meal period. Limits waived for minors with a superintendent's certificate of exemption, hardship approval, domestic service, or employed by parents; DBPR may grant waivers (§ 450.095)."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": null,
          "schoolWeek": 30,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:30",
          "earliestStartNonSchoolDay": "06:30",
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 4,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Fla. Stat. § 450.081(2), (4), (5)",
            "sourceUrl": "http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0450/Sections/0450.081.html"
          },
          {
            "citation": "DBPR Child Labor FAQ",
            "sourceUrl": "https://www2.myfloridalicense.com/?p=12052"
          }
        ],
        "confidence": "high",
        "note": "The 6:30 a.m.-11 p.m. window and the 8 h/day cap apply ONLY when school is scheduled the following day (8 h cap not on a holiday or Sunday); no time-of-day limit before a non-school day. 06:30 is encoded as the start on both school and non-school days (stricter: strictly it binds any morning whose next day is a school day, e.g. a Sunday, and not a Friday or Saturday). 30 h/week applies only while school is in session and a parent/custodian or school superintendent may waive it (DBPR: up to 40 h). The 30-minute meal break after 4 continuous hours applies only on days scheduled for 8+ hours. No school-hours work unless in career education. ALL limits waived for high-school graduates/GED holders, home-education/virtual students separated from teacher by time, hardship/exemption certificates, and minors employed by parents. Amended by ch. 2024-25."
      }
    ]
  },
  "US-GA": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 12,
      "citation": "O.C.G.A. § 39-2-9",
      "sourceUrl": "https://dol.georgia.gov/document/child-labor/child-labor-georgia-laws-and-rules-regulating-employment-children/download",
      "confidence": "high",
      "note": "Georgia's own floor is 12 (no minor under 12 in any gainful occupation; agriculture, domestic service and parent employment excepted). Under 16 barred from mills, factories, laundries, manufacturing establishments, workshops and Commissioner-designated hazardous occupations (§§ 39-2-1, 39-2-2). The federal 14 floor is stricter for FLSA-covered employers."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school superintendent/private-school principal/home-study parent, via GDOL online youth work permit system",
      "citation": "O.C.G.A. § 39-2-11",
      "sourceUrl": "https://dol.georgia.gov/document/child-labor/child-labor-georgia-laws-and-rules-regulating-employment-children/download",
      "confidence": "high",
      "note": "Employment certificate required for ages 12-15, with a school letter showing full-time enrollment and good attendance, updated each January. Minor starts the application online at dol.georgia.gov, employer completes its part, school issuing officer issues it. Not required at 16+ (GDOL: follows federal rules for 16-17). A 2023-24 bill (HB 501) to repeal the certificate did not pass."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 12,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "O.C.G.A. §§ 39-2-3, 39-2-4, 39-2-7",
            "sourceUrl": "https://dol.georgia.gov/document/child-labor/child-labor-georgia-laws-and-rules-regulating-employment-children/download"
          }
        ],
        "confidence": "high",
        "note": "State: 4 h on a day the minor's school is in session, 8 h on other days, 40 h in any week, no work 9pm-6am on any day. The federal FLSA limits for 14-15 (3 h/18 h, 7am-7pm, 9pm June 1-Labor Day) are stricter. No work during public/private school hours unless the minor has completed high school or is excused by the school board."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Georgia DOL, Georgia Laws & Rules Regulating Employment of Children (booklet), p. 1",
            "sourceUrl": "https://dol.georgia.gov/document/child-labor/child-labor-georgia-laws-and-rules-regulating-employment-children/download"
          }
        ],
        "confidence": "high",
        "note": "GDOL states it 'follows the federal regulations regarding employment for youth 16-17'; O.C.G.A. ch. 39-2 hours rules apply only to under 16. No state hours limits."
      }
    ]
  },
  "US-HI": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Haw. Rev. Stat. § 390-2(c), (d)",
      "sourceUrl": "https://data.capitol.hawaii.gov/hrscurrent/Vol07_Ch0346-0398/HRS0390/HRS_0390-0002.htm",
      "confidence": "high",
      "note": "Under 14 only theatrical employment or (with a director's finding) coffee harvesting."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "state labor department (DLIR): certificate of employment (14-15, form CL-1, per employer/job); certificate of age (16-17, online)",
      "citation": "Haw. Rev. Stat. § 390-2(b), (c)",
      "sourceUrl": "https://labor.hawaii.gov/wsd/child-labor/",
      "confidence": "medium",
      "note": "14-15: employer must obtain a DLIR certificate of employment before the minor starts; new employer or occupation needs a new one. 16-17: employer records the number of a DLIR certificate of age (applied for online, no job offer needed). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Haw. Rev. Stat. § 390-2(c)",
            "sourceUrl": "https://data.capitol.hawaii.gov/hrscurrent/Vol07_Ch0346-0398/HRS0390/HRS_0390-0002.htm"
          },
          {
            "citation": "DLIR Child Labor page",
            "sourceUrl": "https://labor.hawaii.gov/wsd/child-labor/"
          }
        ],
        "confidence": "high",
        "note": "7 a.m.-7 p.m. on school days and on the day before a school day; 6 a.m.-9 p.m. on non-school days and the day before a non-school day / authorized school breaks (earliestStartNonSchoolDay 06:00). No more than 6 consecutive days; no more than 5 continuous hours without a 30-minute rest/meal period. The 10-hour combined school+work cap in HAR § 12-25-23 applies to theatrical employment only. Work only when not legally required to attend school or excused."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Haw. Rev. Stat. § 390-2(b)",
            "sourceUrl": "https://data.capitol.hawaii.gov/hrscurrent/Vol07_Ch0346-0398/HRS0390/HRS_0390-0002.htm"
          },
          {
            "citation": "DLIR Child Labor page",
            "sourceUrl": "https://labor.hawaii.gov/wsd/child-labor/"
          }
        ],
        "confidence": "high",
        "note": "No hour limits; may work only when not legally required to attend school or excused (DLIR: 'no hour restrictions except when the minor is required to be in school')."
      }
    ]
  },
  "US-IA": {
    "asOf": "2025-12-09",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Iowa Code § 92.3",
      "sourceUrl": "https://www.legis.iowa.gov/docs/code/92.pdf",
      "confidence": "high",
      "note": "\"No person under fourteen years of age shall be employed or permitted to work with or without compensation in any work activity.\" (Exceptions in § 92.17, e.g. agriculture, newspapers, performers — not read in detail.)"
    },
    "workPermit": null,
    "personalCareNote": "Iowa Code § 92.8(18) bars all under-18s from work involving exposure to dangerous or poisonous dyes or chemicals, which may reach hair-color and chemical services; front-desk and shampoo work are not specifically addressed. § 92.6's further 14-15 prohibitions were not read in full.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 8,
          "schoolWeek": 28,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": "07:00",
            "latestEnd": "23:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Iowa Code § 92.7",
            "sourceUrl": "https://www.legis.iowa.gov/docs/code/92.pdf"
          },
          {
            "citation": "Iowa Code § 92.4",
            "sourceUrl": "https://www.legis.iowa.gov/docs/code/92.pdf"
          }
        ],
        "confidence": "high",
        "note": "2023 Acts ch 92 (SF 542) loosened these: 7 a.m.-9 p.m. any day, to 11 p.m. June 1-Labor Day; while school is in session max 6 h/day and 28 h/week outside school hours; otherwise 8 h/day (exclusive of intermission), 40 h/week. The 6 h cap is written per day 'while school is in session' - it can bind a Saturday during the school year, which nonSchoolDay (8) does not capture. 30-minute intermission required if employed 5+ hours that day. No work during regular school hours unless legally out of school (written proof to the director), in a supervised school-work program, or a part-time student required to work. Federal FLSA limits (3 h/18 h, 7 p.m.) are stricter for covered employers."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Iowa Code § 92.7A",
            "sourceUrl": "https://www.legis.iowa.gov/docs/code/92.pdf"
          }
        ],
        "confidence": "high",
        "note": "\"A person who is sixteen or seventeen years of age may work the same hours as a person who is eighteen years of age.\" (2023 Acts ch 92, § 7)"
      }
    ]
  },
  "US-ID": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Idaho Code § 44-1301",
      "sourceUrl": "https://legislature.idaho.gov/statutesrules/idstat/Title44/T44CH13/SECT44-1301",
      "confidence": "high",
      "note": "The 14 floor applies to listed establishments only: mine, factory, workshop, mercantile establishment, store, telegraph/telephone office, laundry, restaurant, hotel, apartment house, and merchandise/message distribution. Other service businesses are not named (many are arguably a store/mercantile establishment). In any other business a child under 14 may work outside public-school hours, 6 a.m.-9 p.m. only. A child over 12 may work in the listed occupations during school vacations of 2+ weeks."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 9,
          "nonSchoolDay": 9,
          "schoolWeek": 54,
          "nonSchoolWeek": 54,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Idaho Code § 44-1304",
            "sourceUrl": "https://legislature.idaho.gov/statutesrules/idstat/Title44/T44CH13/SECT44-1304"
          },
          {
            "citation": "Idaho Code § 44-1302",
            "sourceUrl": "https://legislature.idaho.gov/statutesrules/idstat/Title44/T44CH13/SECT44-1302"
          }
        ],
        "confidence": "high",
        "note": "Under 16: max 9 h/day, 54 h/week, no work before 6am or after 9pm, regardless of school; federal FLSA limits are stricter. Work during public-school hours is barred for under 16 only if the minor lacks basic literacy/arithmetic attainments (§ 44-1302) — no general school-hours prohibition at 14-15 (there is one for under 14, § 44-1301). Employer must keep a record of names, ages and residences of 14-15-year-olds (§ 44-1303)."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Idaho Code tit. 44, ch. 13 (no 16-17 provisions)",
            "sourceUrl": "https://legislature.idaho.gov/statutesrules/idstat/Title44/T44CH13/"
          }
        ],
        "confidence": "high",
        "note": "Idaho's child labor chapter sets no hours or time limits for 16-17."
      }
    ]
  },
  "US-IL": {
    "asOf": "2026-01-01",
    "effectiveFrom": "2025-01-01",
    "minimumAge": {
      "age": 14,
      "citation": "820 ILCS 206/15(b), (c)",
      "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K15.htm",
      "confidence": "high",
      "note": "Under 14 may work only in occupations explicitly authorized or exempted (e.g. 12-13 youth-sports officiating, 13+ golf caddying, agriculture, newspapers)."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school issuing officer (regional/district superintendent of schools or authorized agent)",
      "citation": "820 ILCS 206/15(b), 206/35(a), (f)",
      "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K35.htm",
      "confidence": "high",
      "note": "Employment certificate required for 14-15 (the Act's 'minor' means under 16), valid only for the employer named; minor submits the employer's notice of intention to employ with the application. Employer keeps a copy on premises for 3 years after employment ends. No certificate for 16-17."
    },
    "personalCareNote": "820 ILCS 206/40(e) (P.A. 104-16, eff. 2026-01-01): no unlicensed minor under 16 may perform barber, cosmetology, esthetics, hair braiding or nail technology services that require a license, except enrolled students working under that licensing act. § 40(a)(14) bars under-16s from exposure to dangerous acids, dyes, chemicals, dust, gases, vapors or fumes; § 40(f) expressly allows office/administrative support work that avoids such exposure.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": 8
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": "07:00",
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "820 ILCS 206/25",
            "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K25.htm"
          },
          {
            "citation": "820 ILCS 206/30(a)",
            "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K30.htm"
          },
          {
            "citation": "820 ILCS 206/35(c), (d)",
            "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K35.htm"
          }
        ],
        "confidence": "high",
        "note": "Child Labor Law of 2024 (P.A. 103-721, eff. 2025-01-01). Exception (§ 30(a)): during the school year a minor may work 8 h on each Saturday and Sunday if they work no more than 6 consecutive days and no more than 24 h outside school hours that week — so the school-week cap can effectively reach 24 h (federal FLSA's 18 h still applies to covered employers). Max 8 h in any 24-hour period; on school days max 3 h work and max 8 h work+school combined. 7am-7pm Labor Day to June 1, 7am-9pm June 1 to Labor Day, any day. Must be supervised on site by an adult 21+ at all times (§ 35(c)). Meal period: no more than 5 continuous hours without 30 min. Park district / youth club recreational work has later hours (§ 30(d))."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "820 ILCS 206/10 (\"Minor\" means any person under the age of 16)",
            "sourceUrl": "https://www.ilga.gov/Documents/legislation/ilcs/documents/082002060K10.htm"
          }
        ],
        "confidence": "high",
        "note": "The Child Labor Law of 2024 covers only persons under 16; it sets no hours limits for 16-17. (General adult meal-break law, 820 ILCS 140, applies to all employees and is out of scope here.)"
      }
    ]
  },
  "US-IN": {
    "asOf": "2026-01-01",
    "effectiveFrom": "2025-01-01",
    "minimumAge": {
      "age": 14,
      "citation": "Ind. Code § 22-2-18.1-12(a)",
      "sourceUrl": "https://codes.findlaw.com/in/title-22-labor-and-safety/in-code-sect-22-2-18-1-12.html",
      "confidence": "medium",
      "note": "Under 14 may work only as farm laborer, domestic service worker, golf caddie, or youth athletic referee/umpire (§ 13). Text read from a secondary statute copy current as of 2026-01-01."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": "07:00",
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ind. Code § 22-2-18.1-17",
            "sourceUrl": "https://codes.findlaw.com/in/title-22-labor-and-safety/in-code-sect-22-2-18-1-17.html"
          },
          {
            "citation": "Ind. Code §§ 22-2-18.1-12(b), 22-2-18.1-16",
            "sourceUrl": "https://codes.findlaw.com/in/title-22-labor-and-safety/in-code-sect-22-2-18-1-16.html"
          },
          {
            "citation": "Indiana DOL, Changes to Youth Employment Laws",
            "sourceUrl": "https://www.in.gov/dol/youth-employment/youth-employment-home/changes-to-youth-employment-laws/"
          }
        ],
        "confidence": "medium",
        "note": "Mirrors federal FLSA. Since 2025-01-01 the 9 p.m. summer end (June 1-Labor Day) applies on any day, even a night before a school day (DOL: 'some exceptions may apply'); 7 p.m. every day otherwise. School-hours prohibition and the hours limits (§ 12(b), § 17(2)(A)-(B)) do not apply to a 14-15-year-old who graduated high school, finished grade 8 and is excused from school with parent statement, has a child to support, is under a court order barring attendance, or is expelled. Farm, domestic, golf-caddie and pro-sports-attending work exempt. No break required (DOL). An unofficial compliance source claims an 8-hour school-Friday rule and 10 p.m. on non-school nights; NOT found in § 17 text as of 2026-01-01 and not used."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Ind. Code § 22-2-18.1-16(a) (hours limits apply only under 16)",
            "sourceUrl": "https://codes.findlaw.com/in/title-22-labor-and-safety/in-code-sect-22-2-18-1-16.html"
          },
          {
            "citation": "Indiana DOL, Changes to Youth Employment Laws",
            "sourceUrl": "https://www.in.gov/dol/youth-employment/youth-employment-home/changes-to-youth-employment-laws/"
          }
        ],
        "confidence": "medium",
        "note": "Effective 2025-01-01, 16-17-year-olds 'may now work the same hours and days as an adult'; the old 9 h/day, 30-40 h/week, 10pm/11pm school-night limits and the parental-permission form are repealed. No break required. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      }
    ]
  },
  "US-KS": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "K.S.A. 38-601",
      "sourceUrl": "https://www.ksrevisor.gov/statutes/chapters/ch38/038_006_0001.html",
      "confidence": "high",
      "note": "\"No child under fourteen (14) years of age shall be at any time employed at any occupation or trade in any business or service, except as provided by K.S.A. 38-614\" (parents' nonhazardous work, domestic service, casual home labor, delivery/messenger, newspapers, agriculture, performers)."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school superintendent (or district court judge)",
      "citation": "K.S.A. 38-604, 38-606",
      "sourceUrl": "https://www.ksrevisor.gov/statutes/chapters/ch38/038_006_0004.html",
      "confidence": "high",
      "note": "Required ONLY for under-16s NOT enrolled in or attending a secondary school in Kansas — a 14-15-year-old attending secondary school needs no permit. Issuance requires completion of the elementary course of study (or a permit limited to when school is not in session)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "K.S.A. 38-603",
            "sourceUrl": "https://www.ksrevisor.gov/statutes/chapters/ch38/038_006_0003.html"
          }
        ],
        "confidence": "high",
        "note": "Statute: no work before 7 a.m. or after 10 p.m. 'except on any evening that does not precede a school day' - so on a night before a non-school day the state sets NO end time (latestEndBeforeNonSchoolDay null = no rule). Max 8 h/calendar day and 40 h/week regardless of school. Applies to the act's vocations, transmission of merchandise/messages, hotels, restaurants and mercantile establishments. Student-learners and school food service exempt. No state school-hours prohibition for regular employment found. Federal FLSA limits are stricter."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "K.S.A. 38-601 to 38-614 (no 16-17 hours provisions)",
            "sourceUrl": "https://www.ksrevisor.gov/statutes/chapters/ch38/038_006_0003.html"
          }
        ],
        "confidence": "high",
        "note": "No state hours limits for 16-17. Under-18 hazardous occupations follow the federal list (K.S.A. 38-602)."
      }
    ]
  },
  "US-KY": {
    "asOf": "2024-11-21",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Ky. Rev. Stat. § 339.220",
      "sourceUrl": "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=32183",
      "confidence": "high",
      "note": "Exception: employment programs supervised and sponsored by the school/school district, approved by the Department of Education. Separate golf-caddie (11+) and nonprofit work-program (12-13, KRS 339.335) exceptions."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "803 Ky. Admin. Regs. 1:100 § 2(2)",
            "sourceUrl": "https://apps.legislature.ky.gov/law/kar/titles/803/001/100/"
          },
          {
            "citation": "Ky. Rev. Stat. § 339.230(1)",
            "sourceUrl": "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=39815"
          },
          {
            "citation": "Ky. Rev. Stat. § 339.270",
            "sourceUrl": "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=49846"
          }
        ],
        "confidence": "high",
        "note": "Under-16s may work during school hours only under a school-arranged alternative schedule, a school-supervised work-experience/career-exploration program (29 CFR 570.35(a)), or after high-school graduation. KRS 339.270(2) also requires a paid 10-minute rest break per 4 hours worked, in addition to the 30-minute lunch after 5 continuous hours. 'Minor' in the regulation means a 14-17-year-old enrolled in school or not yet holding the credits to graduate."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 8,
          "schoolWeek": 30,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:30",
          "latestEndBeforeNonSchoolDay": "25:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": null
          }
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "803 Ky. Admin. Regs. 1:100 § 3(2)",
            "sourceUrl": "https://apps.legislature.ky.gov/law/kar/titles/803/001/100/"
          },
          {
            "citation": "Ky. Rev. Stat. § 339.270",
            "sourceUrl": "https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=49846"
          }
        ],
        "confidence": "high",
        "note": "All 16-17 limits apply only while school is in session; when school is not in session the state sets no hours or time-of-day limit (encoded as vacation with no end time; the 06:00 start and the 8 h non-school-day cap are still applied in vacation because the schema cannot lift them, which is stricter than the law). Parent written permission raises the school-day cap to 6.5 h, the school-week cap to 32.5 h, and the school-night end to 23:00; parent permission plus school certification of a 2.0+ GPA raises the school-week cap to 40 h (not encoded: stricter values kept). Permissions must be kept at the workplace. The regulation does not apply to a 16-17-year-old who has earned the credits to graduate and is not enrolled. Also a paid 10-minute rest break per 4 hours worked (KRS 339.270(2))."
      }
    ]
  },
  "US-LA": {
    "asOf": "2026-05-11",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "La. R.S. 23:162",
      "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83629",
      "confidence": "high",
      "note": "Exception: 12-13-year-olds may work in a business owned/partnered by their parent or guardian, under that parent's direct supervision, with an employment certificate and all 14-15 protections. Part does not apply to agriculture or domestic service in private homes (R.S. 23:151)."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "self-issued form: minor + parent sign the Louisiana Workforce Commission employment certificate form and submit it with proof of age to the employer (schools no longer issue, since Act 61 of 2026)",
      "citation": "La. R.S. 23:182, 23:181, 23:184 (as amended by 2026 La. Acts No. 61, HB 232, eff. 2026-05-11)",
      "sourceUrl": "https://www.legis.la.gov/Legis/ViewDocument.aspx?d=1466779",
      "confidence": "high",
      "note": "Every employer of minors (under 18) must keep an employment certificate on file and accessible at the job site (R.S. 23:182, https://legis.la.gov/Legis/Law.aspx?d=83739). Act 61 (2026) repealed R.S. 23:183 (school superintendent/principal issuance) and moved approval to the employer; the certificate is valid only for the named employer. The legis.la.gov consolidated text of 23:183/184 had not yet been updated to reflect Act 61 when checked (2026-10-11). Exemptions: approved federally funded youth training programs and performing arts/modeling/media."
    },
    "personalCareNote": "La. R.S. 23:161(12) bars all minors (under 18) from occupations involving exposure to dangerous or poisonous dyes and chemicals, which may reach hair-dye and chemical-service work; front-desk or shampoo-only work is not obviously covered.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "La. R.S. 23:211",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83832"
          },
          {
            "citation": "La. R.S. 23:213",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83835"
          },
          {
            "citation": "La. R.S. 23:214",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83836"
          },
          {
            "citation": "La. R.S. 23:215(B)-(C)",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83837"
          },
          {
            "citation": "La. R.S. 23:166",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83659"
          }
        ],
        "confidence": "high",
        "note": "8 h/day and 6 consecutive days/week cap applies on every day (R.S. 23:211). The 7pm/7am window and 40 h/week cap apply to under-16s who have not graduated high school (GED counts as graduated). Meal break: 30 min within any 5-hour period (20-29 min and up to 10 min over are de minimis since Acts 2024 No. 603); meal interval is not working time. 14-15s may work only after school hours and on non-school days (R.S. 23:166). Local curfew ordinances also apply (R.S. 23:215(F)). School day/week is set by the minor's school or district calendar."
      },
      {
        "minAge": 16,
        "maxAge": 16,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "La. R.S. 23:215(A)(1)",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83837"
          }
        ],
        "confidence": "high",
        "note": "The 11 p.m.-5 a.m. prohibition applies only on the night before a school day (so the 05:00 start binds only school-day mornings) and only to a 16-year-old who has not graduated high school (GED counts). No state daily/weekly hour cap and no state meal-break rule for 16-17 (R.S. 23:211 and 23:213 cover under-16 only). Some secondary summaries mention an 8-hour rest between shifts for 16-17; not found in the current statute text, not used."
      },
      {
        "minAge": 17,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "24:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "La. R.S. 23:215(A)(2)",
            "sourceUrl": "https://legis.la.gov/Legis/Law.aspx?d=83837"
          }
        ],
        "confidence": "high",
        "note": "Work prohibited midnight ('24:00')-5:00 a.m. before a school day, only for a 17-year-old who has not graduated high school (GED counts); the 05:00 start binds only school-day mornings. No state daily/weekly hour cap and no state meal-break rule for 17-year-olds."
      }
    ]
  },
  "US-MA": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "M.G.L. c. 149, §§ 60, 86",
      "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section86",
      "confidence": "high",
      "note": "Employment permits are issued only to children 14 or older (§ 86); under-16s are barred from mercantile establishments, barber shops etc. except as provided in §§ 69 and 86 (§ 60). Under-14 exceptions: newspaper sale/delivery from age 9 (§ 69), entertainment with waivers, volunteer hospital work at 13."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school district superintendent of schools (or written designee) where the minor lives or attends school",
      "citation": "M.G.L. c. 149, §§ 86, 87",
      "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section87",
      "confidence": "high",
      "note": "Employer must keep the permit on file and return it within 2 days of termination. Application requires a pledge signed by employer, minor and parent; under-16s also need a school record and a physician's health certificate. A 17-year-old with documented proof of a high-school diploma/equivalent may obtain a permit without the superintendent's signature."
    },
    "personalCareNote": "M.G.L. c. 149, § 56 names manicuring, hairdressing and beauty-culture establishments: minors there may work at most 9 h/day and 48 h/week, with any split shift within 10 consecutive hours. § 60 lists barber shops among places under-16s may work only with a § 86 employment permit. No outright age ban found.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:30",
          "earliestStartNonSchoolDay": "06:30",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "07-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "M.G.L. c. 149, § 65",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section65"
          },
          {
            "citation": "M.G.L. c. 149, § 60",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section60"
          },
          {
            "citation": "M.G.L. c. 149, § 66",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section66"
          }
        ],
        "confidence": "medium",
        "note": "STATUTE CONFLICT: § 65 sets 6:30 a.m.-7 p.m. (9 p.m. July 1 through Labor Day) for under-16s, but § 60 (older text, still on the books) says no under-16 work before 6:30 a.m. or after 6:00 p.m. The Attorney General's posters use 7 p.m./9 p.m.; 19:00 is encoded per § 65 and the AG - a cautious consumer may prefer 18:00. The state statute itself sets only 8 h/day, 48 h/week and 6 days; the 3 h school-day / 18 h school-week caps on AG posters are the federal FLSA limits and are not in this entry. Split shifts must fall within 9 consecutive hours (§ 65). After 8 p.m. a minor must be directly supervised by an adult on site (§ 66). No work during public-school hours (§ 60). A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 9,
          "nonSchoolDay": 9,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "23:30",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "M.G.L. c. 149, § 66",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section66"
          },
          {
            "citation": "M.G.L. c. 149, § 67",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section67"
          },
          {
            "citation": "M.G.L. c. 149, § 56",
            "sourceUrl": "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXXI/Chapter149/Section56"
          }
        ],
        "confidence": "high",
        "note": "latestEnd 22:00 on a night before a regularly scheduled school day; an establishment that stops serving customers at 10 p.m. may keep the minor until 22:15. On other nights 23:30 (restaurants and race tracks: midnight). After 8 p.m. the minor must be directly supervised by an adult on site (mall kiosk exception). Split shifts: § 67 says within 12 consecutive hours, but § 56 (manicuring, hairdressing and beauty-culture establishments) caps the spread at 10 consecutive hours. Limits apply year-round (no school-session distinction). A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-MD": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Md. Code, Lab. & Empl. § 3-209",
      "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-209",
      "confidence": "high",
      "note": "Subtitle does not apply (outside school hours, non-hazardous) to work in a business owned/operated by a parent, domestic/farm work, caddying, newspaper delivery, youth-camp counselors, nonprofit volunteers, etc. (§ 3-203). Special permits for entertainers/models of any age (§ 3-207)."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "Maryland Department of Labor (Commissioner), online application by parent/guardian",
      "citation": "Md. Code, Lab. & Empl. §§ 3-201, 3-205, 3-206",
      "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-206",
      "confidence": "high",
      "note": "A 'minor' is anyone under 18 (§ 3-201); an employer may not let a minor work without possessing a work permit for that minor (§ 3-205). The permit authorizes work for the employer specified in it (§ 3-208)."
    },
    "personalCareNote": "Md. Code, Lab. & Empl. § 3-213(b)(2) bars under-16s from work about or in connection with an acid, dye, gas, lye or paint, which likely excludes 14-15-year-olds from hair-color and chemical services.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 23,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": 12
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "20:00",
          "latestEndBeforeNonSchoolDay": "20:00",
          "summer": {
            "from": "memorial-day",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Md. Code, Lab. & Empl. § 3-211",
            "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-211"
          },
          {
            "citation": "Md. Code, Lab. & Empl. § 3-210",
            "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-210"
          },
          {
            "citation": "Md. Code, Lab. & Empl. § 3-213(b)(1)",
            "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-213"
          }
        ],
        "confidence": "high",
        "note": "summer.from is MEMORIAL DAY (last Monday of May), not a fixed date: the 21:00 end runs Memorial Day through Labor Day; 20:00 from the day after Labor Day to the day before Memorial Day. The 23-hour cap is for a week when school is in session 5 days. Combined school + work hours may not exceed 12 in a calendar day, and the minor must have 8 consecutive hours free of school and work. Work-study/student-learner hours during school do not count toward the caps. The Commissioner may grant individual exceptions with parental consent."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": 12
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Md. Code, Lab. & Empl. § 3-210",
            "sourceUrl": "https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gle&section=3-210"
          }
        ],
        "confidence": "high",
        "note": "No state day/week cap or time-of-day window for 16-17, but in any calendar day combined school + work hours may not exceed 12 AND the minor must have at least 8 consecutive hours not in school or at work (Commissioner may grant exceptions). 30-minute non-working period after 5 consecutive hours. Separate rule: no minor may transport cash/checks for a business 8pm-8am (§ 3-212)."
      }
    ]
  },
  "US-ME": {
    "asOf": "2026-10-05",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "26 M.R.S. § 771",
      "sourceUrl": "https://legislature.maine.gov/statutes/26/title26sec771.html",
      "confidence": "high",
      "note": "Exceptions: certain non-hazardous agricultural work, school lunch programs (serving/cleanup), and a business solely owned by the minor's parents."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "signed by local school superintendent (or designee), issued by Maine Bureau of Labor Standards",
      "citation": "26 M.R.S. § 775",
      "sourceUrl": "https://legislature.maine.gov/statutes/26/title26sec775.html",
      "confidence": "high",
      "note": "Permit is valid only for the employer and positions listed. During the school year the minor must be enrolled, not truant/suspended, and passing a majority of courses; only one permit at a time during the school year (two allowed for summer vacation). No permit required at 16-17."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "26 M.R.S. § 774(2)-(3), (5)",
            "sourceUrl": "https://legislature.maine.gov/statutes/26/title26sec774.html"
          }
        ],
        "confidence": "high",
        "note": "During SUMMER VACATION the end time is 21:00 (no work 9 p.m.-7 a.m.); the statute ties this to 'summer vacation', not dates, so it is encoded as `vacation`, and 19:00 applies otherwise. Max 6 consecutive days. Section 774 does not apply to a minor with a high-school diploma/equivalency or who is emancipated. School-hours ban (under 17) has exceptions: excused from attendance, alternative-education work plan, approved vocational co-op, principal-granted early release. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 16,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 10,
          "schoolWeek": 24,
          "nonSchoolWeek": 50,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "22:15",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "26 M.R.S. § 774(1), (3), (5)",
            "sourceUrl": "https://legislature.maine.gov/statutes/26/title26sec774.html"
          }
        ],
        "confidence": "high",
        "note": "16-17 limits apply only to a minor ENROLLED IN SCHOOL; not to a high-school graduate/equivalency holder or emancipated minor. Up to 8 hours on the last scheduled day of the school week (schoolDay 6 kept as stricter). The 50-hour week also applies in a school week with fewer than 3 school days and in the first and last week of the school calendar (schoolWeek 24 kept as stricter). Start 07:00 on a school day, 05:00 on any other day; end 22:15 before a school day, midnight ('24:00') otherwise. A minor under 17 may not work during public-school hours (same exceptions as 14-15). A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 17,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 6,
          "nonSchoolDay": 10,
          "schoolWeek": 24,
          "nonSchoolWeek": 50,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "22:15",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "26 M.R.S. § 774(1), (5)",
            "sourceUrl": "https://legislature.maine.gov/statutes/26/title26sec774.html"
          }
        ],
        "confidence": "high",
        "note": "Same as 16 except the school-hours ban (under 17 only) does not apply. Limits apply only to a 17-year-old enrolled in school. Up to 8 hours on the last school day of the week and 50 h in short (<3 day) school weeks and the first/last week of the school calendar (stricter 6 h / 24 h kept). Start 07:00 on a school day, 05:00 otherwise; end 22:15 before a school day, midnight ('24:00') otherwise. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-MI": {
    "asOf": "2025-04-02",
    "effectiveFrom": "2025-04-02",
    "minimumAge": {
      "age": 14,
      "citation": "MCL 409.103(2)",
      "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-103",
      "confidence": "high",
      "note": "Exceptions: golf caddy and bridge caddy at 11+, youth sports referee/umpire 11-13 with conditions, seed-production farming and trap-setting at 13+."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "Michigan Department of Labor and Economic Opportunity (director) via online registration system - since 2026-10-02; previously the school's issuing officer",
      "citation": "MCL 409.104, 409.104a, 409.104b (2024 PA 196, eff. 2025-04-02)",
      "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-104a",
      "confidence": "high",
      "note": "Transition: until 18 months after 2024 PA 196 took effect (2025-04-02 + 18 months = 2026-10-02) the school's issuing officer issued paper work permits. From 2026-10-02 the minor (or parent) and the employer must both register in the state system, and the department must determine compliance (5 days; employer may start if no answer in 5 days); permits are issued by the director. A minor already lawfully employed on that date need not register until changing employer, changing primary work location, or turning 16. Exempt: seed-production farming (13+, vacation), unpaid volunteers for 501(c)(3)s and fairs."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 3,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "MCL 409.110 (as amended by 2024 PA 196, eff. 2025-04-02)",
            "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-110"
          },
          {
            "citation": "MCL 409.112",
            "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-112"
          }
        ],
        "confidence": "high",
        "note": "IMPORTANT: the 3-hour cap is 'per day during a WEEK when school is in session' - it applies to EVERY day of a school week, including Saturdays/Sundays. Encoded stricter: maxHours.nonSchoolDay = 3. In a week school is NOT in session Michigan sets no daily cap at all (the federal 8 h applies), so this entry over-restricts summer days. The 7 p.m. end applies every day outside June 1-Labor Day. The state no longer sets an 8 h/day, 6-day, or 48 h combined school+work cap (removed by 2024 PA 196). 'Outside school hours', 'week' and 'week when school is in session' are defined by reference to 29 CFR 570.35."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 24,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:30",
          "latestEndBeforeNonSchoolDay": "22:30",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "23:30"
          }
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "MCL 409.111",
            "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-111"
          },
          {
            "citation": "MCL 409.112",
            "sourceUrl": "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-409-112"
          }
        ],
        "confidence": "high",
        "note": "Also capped at an AVERAGE of 8 hours/day over a week (so 6 days x 10 h is not allowed; 48 h/week max). The 24 h/week cap applies only to a student while school is in session. The 23:30 end applies to a student only on Fridays and Saturdays, during school vacation periods, or when not regularly enrolled; the schema cannot name Fridays and Saturdays, so 22:30 is encoded on every night outside a vacation (stricter on Fridays and Saturdays), and 23:30 during a vacation. A minor 16+ not enrolled in school may work to 23:30 any night. Deviations may be granted by the department (MCL 409.120). The statute allows 10 hours in a day but no more than a weekly average of 8 hours a day; because an average over the days worked cannot be held by a per-day cap, 8 hours a day is encoded (stricter)."
      }
    ]
  },
  "US-MN": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Minn. Stat. § 181A.04, subd. 1",
      "sourceUrl": "https://www.revisor.mn.gov/statutes/cite/181A.04",
      "confidence": "high",
      "note": "Exceptions (§ 181A.07): agricultural work at 12+ with parent permission, actors/models/performers, newspaper carriers at 11+, youth sports referees 11-13, and minors employed by a parent / home chores / babysitting are exempt from the whole chapter."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Minn. Stat. § 181A.04, subds. 2-4",
            "sourceUrl": "https://www.revisor.mn.gov/statutes/cite/181A.04"
          }
        ],
        "confidence": "high",
        "note": "8 hours is per any 24-hour period and 40 h/week year-round; Minnesota sets no separate school-day/school-week cap (the federal 3 h/18 h limits still apply). 7am-9pm applies every day, all year. No work during school hours on school days except with an employment certificate under § 181A.05. No minor-specific meal-break rule; Minnesota's general rules (Minn. Stat. §§ 177.253-.254) require restroom time every 4 hours and time to eat a meal for 8+ consecutive hours, with no fixed minutes, so not encoded."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Minn. Stat. § 181A.04, subd. 6",
            "sourceUrl": "https://www.revisor.mn.gov/statutes/cite/181A.04"
          }
        ],
        "confidence": "high",
        "note": "The time limits apply only to a HIGH SCHOOL STUDENT: no work after 11pm on an evening before a school day or before 5am on a school day. With a signed parent/guardian note: until 11:30pm and from 4:30am. Does not apply to students in approved alternative education programs or area learning centers, nor to a 16-17-year-old who is not a high-school student. No state daily/weekly hour cap for 16-17. No minor-specific meal-break rule (see 14-15 note)."
      }
    ]
  },
  "US-MO": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Mo. Rev. Stat. § 294.021",
      "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.021",
      "confidence": "high",
      "note": "'Employ' excludes a child working under the direct control of the child's parent, and newspaper delivery/sales, child care, occasional yard/farm work and youth-sports officiating by a child over 12 (§ 294.011(7)). Entertainment industry has its own permit (§ 294.022)."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school district superintendent (or authorized designee), charter-school CEO, or school principal; parent/home-school educator for home-schooled students",
      "citation": "Mo. Rev. Stat. §§ 294.024, 294.045, 294.051",
      "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.024",
      "confidence": "high",
      "note": "Required only for a 'child' (under 16) employed DURING THE REGULAR SCHOOL TERM (§ 294.024); the statute does not require one for summer-only employment. Application in person with written parental consent, employer's statement of intent, proof of age, school grades certificate, and a physician's certificate if the issuing officer requires it. Employer keeps it on file and posts a list of employed under-16s (§ 294.060)."
    },
    "personalCareNote": "Mo. Rev. Stat. § 294.040(12) bars under-16s from any occupation involving exposure to toxic or hazardous chemicals (and (3) ladders, (1) power-driven machinery), which likely excludes 14-15-year-olds from chemical hair services (color, perms, relaxers).",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Mo. Rev. Stat. § 294.030",
            "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.030"
          },
          {
            "citation": "Mo. Rev. Stat. § 294.027",
            "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.027"
          },
          {
            "citation": "Mo. Rev. Stat. § 294.011(1)",
            "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.011"
          }
        ],
        "confidence": "high",
        "note": "Missouri sets 40 h/week in ANY week (no separate school-week cap; the federal 18 h school-week cap still applies). Work certificates permit employment only during non-school hours in the school term. The 7pm/9pm evening limit (subsection 2) does not apply to children permanently excused from school. The director may waive the hours limits only for entertainment-industry employment (§ 294.022). Regional-fair exception to 10:30pm (summer, supervised, parental consent; not for FLSA-covered employers). No state meal-break rule for non-entertainment work. Hour limits for a certificate are applied using the child's own school calendar (§ 294.045(4))."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Mo. Rev. Stat. § 294.011(1) ('child' means under 16)",
            "sourceUrl": "https://revisor.mo.gov/main/OneSection.aspx?section=294.011"
          }
        ],
        "confidence": "high",
        "note": "Missouri's child labor chapter regulates only a 'child' (under 16, unless otherwise specified); it sets no hours, time-of-day, permit or meal-break rule for 16-17-year-olds in retail/service work."
      }
    ]
  },
  "US-MS": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": null,
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Miss. Code Ann. § 71-1-21(1) (text as quoted in 2007 H.B. 318, introduced)",
            "sourceUrl": "https://billstatus.ls.state.ms.us/documents/2007/html/HB/0300-0399/HB0318IN.htm"
          },
          {
            "citation": "U.S. DOL WHD, State Child Labor Laws table (rev. 2025-07-15) - cross-check",
            "sourceUrl": "https://www.dol.gov/agencies/whd/state/child-labor"
          }
        ],
        "confidence": "medium",
        "note": "Mississippi sets NO hours/time-of-day limits for retail or service work. Its only child-labor hours rule (Miss. Code § 71-1-21: 14-15-year-olds max 8 h/day, 44 h/week, not 7 p.m.-6 a.m.) applies only in a mill, cannery, workshop, factory or manufacturing establishment, so it is not in this band. Federal FLSA rules govern. No state meal-break law."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Miss. Code Ann. § 71-1-21(1) (text as quoted in 2007 H.B. 318, introduced)",
            "sourceUrl": "https://billstatus.ls.state.ms.us/documents/2007/html/HB/0300-0399/HB0318IN.htm"
          },
          {
            "citation": "U.S. DOL WHD, State Child Labor Laws table (rev. 2025-07-15) - cross-check",
            "sourceUrl": "https://www.dol.gov/agencies/whd/state/child-labor"
          }
        ],
        "confidence": "medium",
        "note": "No state hours, time-of-day, or meal-break rule for 16-17-year-olds in retail/service work. A 2007 bill (H.B. 318) to bar under-18s from working after 10pm on school nights was introduced but is not reflected in current summaries (DOL table rev. 2025) - not law."
      }
    ]
  },
  "US-MT": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Mont. Code Ann. § 41-2-105",
      "sourceUrl": "https://mca.legmt.gov/bills/mca/title_0410/chapter_0020/part_0010/section_0050/0410-0020-0010-0050.html",
      "confidence": "high",
      "note": "A minor under 14 may not be employed in or in connection with an occupation, except as provided in § 41-2-104 (parents, casual household work, performers, newspaper distribution, etc.). 14–15 are limited to the occupations listed in § 41-2-108 (retail/food-service office, cashiering, selling, cleanup, etc.)."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Mont. Code Ann. § 41-2-115",
            "sourceUrl": "https://mca.legmt.gov/bills/mca/title_0410/chapter_0020/part_0010/section_0150/0410-0020-0010-0150.html"
          },
          {
            "citation": "Mont. Code Ann. § 41-2-108",
            "sourceUrl": "https://mca.legmt.gov/bills/mca/title_0410/chapter_0020/part_0010/section_0080/0410-0020-0010-0080.html"
          },
          {
            "citation": "Montana DLI, Child Labor Law Reference Guide",
            "sourceUrl": "https://erd.dli.mt.gov/labor-standards/child-labor-law/child-labor-law-reference-guide"
          }
        ],
        "confidence": "high",
        "note": "The 9 p.m. end applies 'during periods outside the school year (June 1 through Labor Day, depending on local standards)' — the statute's own wording, so the summer window can vary with local school calendars. Students in an approved school-supervised work experience / career exploration program may work up to 23 hours in a school week, some during school hours (§ 41-2-115(2), § 41-2-108). Exemptions in § 41-2-104 (e.g. employed by a parent) take the minor out of the act entirely."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Mont. Code Ann. § 41-2-115",
            "sourceUrl": "https://mca.legmt.gov/bills/mca/title_0410/chapter_0020/part_0010/section_0150/0410-0020-0010-0150.html"
          },
          {
            "citation": "Mont. Code Ann. § 41-2-107",
            "sourceUrl": "https://mca.legmt.gov/bills/mca/title_0410/chapter_0020/part_0010/section_0070/0410-0020-0010-0070.html"
          }
        ],
        "confidence": "high",
        "note": "Montana sets no hours or time-of-day limits for 16–17; § 41-2-115 addresses only 14 and 15. Only hazardous-occupation prohibitions (§ 41-2-107) apply."
      }
    ]
  },
  "US-NC": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "N.C. Gen. Stat. § 95-25.5(d)",
      "sourceUrl": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_95/GS_95-25.5.html",
      "confidence": "high",
      "note": "Youths 13 or younger may not be employed. The one exception is that 12- and 13-year-olds may deliver newspapers outside school hours, up to 3 hours a day. The Commissioner may waive provisions for youths 13+ (§ 95-25.5(f)). Youths employed by their parent or guardian are exempt (§ 95-25.5(i))."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "NC Department of Labor, online (employer initiates with the youth's YEID; youth, parent and employer e-sign)",
      "citation": "N.C. Gen. Stat. § 95-25.5(a)",
      "sourceUrl": "https://www.labor.nc.gov/workplace-rights/youth-employment-rules/apply-youth-employment-certificate",
      "confidence": "medium",
      "note": "A Youth Employment Certificate is required for everyone under 18, and it still applies to employers covered by the FLSA (§ 95-25.5(k)). The youth, parent/guardian and employer must all sign before the first day of work. NCDOL will not issue a certificate for employment that would violate the FLSA child-labor rules. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "N.C. Gen. Stat. § 95-25.5(c), (e), (a1), (k)",
            "sourceUrl": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_95/GS_95-25.5.html"
          }
        ],
        "confidence": "high",
        "note": "IMPORTANT: under § 95-25.5(k), employers subject to the federal FLSA are exempt from everything in § 95-25.5 except the certificate (a), the school-night rule (a1), hazardous occupations (b), and the alcohol rules (j). So the hours caps, the 7 a.m.-7 p.m. window and the 30-minute break after 5 hours bind only employers NOT covered by the FLSA; covered employers follow the federal rules. The band is kept for all employers (stricter is safe). The 9 p.m. end applies 'during the summer (when school is not in session)' with no dates, so it is encoded as `vacation`. Enrollees in high school apprenticeship or FLSA WECEP programs may work 23 hours/week in term, including during school hours. Separately, § 95-25.5(a1) applies to every employer: a youth enrolled in grade 12 or lower may not work between 11 p.m. and 5 a.m. when there is school the next day."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.C. Gen. Stat. § 95-25.5(a1), (k)",
            "sourceUrl": "https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/BySection/Chapter_95/GS_95-25.5.html"
          }
        ],
        "confidence": "high",
        "note": "The 11 p.m.-5 a.m. ban applies only during the regular school term, to a youth enrolled in grade 12 or lower, when there is school the next day. It does not apply on nights before non-school days, in summer, or to graduates or non-enrolled youth; the 05:00 start likewise binds only school-day mornings. The ban is waived if the employer has written approval from BOTH a parent/guardian AND the school principal or designee. It applies to FLSA-covered employers too. No NC hours caps or meal-break rule for 16-17."
      }
    ]
  },
  "US-ND": {
    "asOf": "2025-06-30",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "N.D. Cent. Code § 34-07-01",
      "sourceUrl": "https://ndlegis.gov/cencode/t34c07.pdf",
      "confidence": "high",
      "note": "No minor under 14 may be employed in any occupation except farm labor, domestic service, or work for and under the direct supervision of the minor's parent, guardian or grandparent. Under-14s may never work during public-school hours."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "the minor's parent or guardian, on the Labor Commissioner's form; a copy is filed with the Department of Labor and Human Rights, the employer, or the school principal within 10 days",
      "citation": "N.D. Cent. Code §§ 34-07-02, 34-07-05, 34-07-12",
      "sourceUrl": "https://ndlegis.gov/cencode/t34c07.pdf",
      "confidence": "high",
      "note": "Unusually, the employment certificate for 14–15 is issued by the PARENT or guardian, not a school or the state. It states the date of birth and the job duties, and both parent and employer sign it. The employer keeps it on file for inspection. It is not required for farm labor, domestic service, work for a parent or guardian, the minor's own business, or minors exempt from compulsory attendance. A term-time certificate requires passing grades, and a truant or academically deficient minor may not be employed (§ 34-07-11)."
    },
    "personalCareNote": "N.D. Cent. Code § 34-07-16(17) bars 14-15-year-olds from loading, handling, mixing, applying or working around chemicals, toxins or heavy metals; read literally it could bar them from chemical hair services (color, perms, relaxers) and possibly from working near them. The section does not name cosmetology and no official interpretation was found.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.D. Cent. Code § 34-07-15",
            "sourceUrl": "https://ndlegis.gov/cencode/t34c07.pdf"
          },
          {
            "citation": "N.D. Cent. Code § 34-07-11",
            "sourceUrl": "https://ndlegis.gov/cencode/t34c07.pdf"
          }
        ],
        "confidence": "high",
        "note": "A 'schoolweek' is any Sunday–Saturday week in which the youth must attend school, for any period of time, on 4 or more days. A week with 3 or fewer school days is therefore a non-school week (40 hours). The school-day and school-week limits do not apply to minors exempt from compulsory attendance under § 15.1-20-02(1)(b)–(d). Sports-attendant work at professional sporting events, domestic service and farm labor are exempt from the time and hours limits. Employers must post a notice of the minor's hours, including meal times. ND's general break rule (N.D. Admin. Code § 46-02-07-02: a 30-minute meal period on shifts over 5 hours when two or more employees are on duty) covers all employees and is not encoded as minor-specific."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.D. Cent. Code ch. 34-07",
            "sourceUrl": "https://ndlegis.gov/cencode/t34c07.pdf"
          }
        ],
        "confidence": "high",
        "note": "Chapter 34-07 sets no hours, time-of-day or certificate rules for 16–17; § 34-07-15 covers only 14 and 15. Only hazardous-occupation rules apply (§ 34-07-17.2 lets 16+ apprentices and student learners do hazardous work)."
      }
    ]
  },
  "US-NE": {
    "asOf": "2026-07-18",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Neb. Rev. Stat. §§ 48-302, 48-304",
      "sourceUrl": "https://nebraskalegislature.gov/laws/statutes.php?statute=48-304",
      "confidence": "medium",
      "note": "Nebraska has no stand-alone 'minimum age' sentence. The minimum of 14 is inferred from two provisions read together: § 48-302 bars employing anyone under 16 without an employment certificate on file, and § 48-304 lets an under-14 child get a certificate only for work in an employment program that the child's school or school district supervises and sponsors. For ordinary retail/service work that makes 14 the effective floor."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school (principal / superintendent or written designee); Nebraska DOL for out-of-state children",
      "citation": "Neb. Rev. Stat. §§ 48-302, 48-303",
      "sourceUrl": "https://nebraskalegislature.gov/laws/statutes.php?statute=48-302",
      "confidence": "high",
      "note": "The employer must keep the certificate on file while the minor works and for 12 months after separation or the minor's 16th birthday. The employer must also post Form 110 listing the child's hours. Amended by LB847 (2026), effective 2026-07-18."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "22:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Neb. Rev. Stat. § 48-310",
            "sourceUrl": "https://nebraskalegislature.gov/laws/statutes.php?statute=48-310"
          },
          {
            "citation": "Nebraska DOL, Employment of Minors",
            "sourceUrl": "https://dol.nebraska.gov/LaborStandards/WorkerRights/EmploymentOfMinors"
          }
        ],
        "confidence": "high",
        "note": "Nebraska's daily and weekly caps are the same on school and non-school days: 8 hours a day and 48 a week. The certificate issuer can limit or extend the stated hour for an individual child by endorsement. Work after 10 p.m. is allowed only when there is no school the next day, and needs the child's signed consent, the endorsement, and a special DOL permit for the employer (inspection, up to 90 days, $10; DOL says not available to employers covered by federal law) - so 22:00 is encoded on every night (stricter). Under-14s (school programs only) have an 8 p.m. end time."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Neb. Rev. Stat. § 48-310",
            "sourceUrl": "https://nebraskalegislature.gov/laws/statutes.php?statute=48-310"
          }
        ],
        "confidence": "high",
        "note": "§ 48-310's hours limits apply only to persons under 16; Nebraska sets no hours limits for 16–17."
      }
    ]
  },
  "US-NH": {
    "asOf": "2022-06-17",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 12,
      "citation": "N.H. Rev. Stat. Ann. § 276-A:4, V",
      "sourceUrl": "https://gc.nh.gov/rsa/html/XXIII/276-A/276-A-4.htm",
      "confidence": "high",
      "note": "A youth under 12 may not be employed except by a parent, grandparent or guardian, in casual work, or in door-to-door newspaper delivery. Federal law (14) is stricter for covered employers."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school principal (or designee), or the youth's parent/legal guardian, after satisfactory academic performance is shown",
      "citation": "N.H. Rev. Stat. Ann. §§ 276-A:4, II; 276-A:5",
      "sourceUrl": "https://gc.nh.gov/rsa/html/XXIII/276-A/276-A-mrg.htm",
      "confidence": "high",
      "note": "Youth employment certificate for under 16 (not for work for a parent, grandparent or guardian, casual work, or farm labor). The employer has 3 business days from the first day of work to obtain it. Separately, a 16–17-year-old who has not graduated or earned a GED needs a signed written permission from a parent or guardian on file with the employer (§ 276-A:4, VIII). That is a parental-consent document, not a certificate."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 23,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "21:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.H. Rev. Stat. Ann. § 276-A:4, IV",
            "sourceUrl": "https://gc.nh.gov/rsa/html/XXIII/276-A/276-A-4.htm"
          }
        ],
        "confidence": "high",
        "note": "These limits apply to all youth under 16, including under-14s, who may work in New Hampshire from age 12 (this band is kept at 14-15 as researched; a 12-13-year-old in NH is bound by the same numbers). The 48-hour week applies 'during vacations', and the 7 a.m.-9 p.m. window applies year-round. The labor commissioner can suspend the hours limits only for agricultural work. New Hampshire's general meal rule (RSA 275:30-a: 30 minutes after 5 consecutive hours) covers all employees and is not minor-specific, so mealBreak is null."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": 35,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.H. Rev. Stat. Ann. § 276-A:4, VI–VIII",
            "sourceUrl": "https://gc.nh.gov/rsa/html/XXIII/276-A/276-A-4.htm"
          }
        ],
        "confidence": "high",
        "note": "These limits apply only to 16-17-year-olds 'duly enrolled in school'. The 35-hour cap applies only in a work week in which school is in session all 5 days, so a partial school week has no state cap (35 kept as stricter). During school vacations (summer = June 1 through Labor Day) the limit is 48 hours a week and no more than 6 consecutive days; maxDaysPerWeek 6 is applied all year (stricter: no day limit in school weeks). Youths who live and work at a summer camp for minors are exempt from the vacation limit. Parental written permission is required unless the youth has graduated or has a GED. There is no time-of-day limit."
      }
    ]
  },
  "US-NJ": {
    "asOf": "2023-06-01",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "N.J.S.A. 34:2-21.2; NJDOL Child Labor Law Abstract (MW-129)",
      "sourceUrl": "https://www.nj.gov/labor/myworkrights/worker-protections/workers_under_18/",
      "confidence": "medium",
      "note": "The minimum age for general employment (retail, restaurant, hotel, office) is 14. Exceptions: 11 for newspaper delivery, and 12 for agriculture and theatrical work. Under 16 may work only outside school hours. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "NJ Department of Labor and Workforce Development, online (MyWorkingPapers.nj.gov)",
      "citation": "N.J.S.A. 34:2-21.7 et seq. (as amended by P.L.2022); NJDOL Working Papers FAQ",
      "sourceUrl": "https://www.nj.gov/labor/youngworkers/find-a-job/working-papers/faqs.shtml",
      "confidence": "medium",
      "note": "Working papers are required for every minor under 18 and for each job. Since 2023-06-01 they are issued online by NJDOL, not by schools. The process: the minor has a job offer and the employer's 8-digit registration code, then a parent or caregiver gives permission and proof of age. The 2023 MW-129 poster still says to apply to the school district, which is stale. Exception: no papers are needed for the first 14 days of school-vacation work at age 15+ in food service, restaurant, retail or seasonal amusement (MW-129 note 2). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": "New Jersey bars all minors (under 18) from handling dangerous or poisonous acids or dyes and corrosive, carcinogenic or toxic substances (N.J.A.C. 12:58). This plausibly reaches hair dye, relaxers and perms, but no New Jersey source names cosmetology, so it is unconfirmed.",
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "N.J.S.A. 34:2-21.3, 34:2-21.4; N.J.A.C. 12:58",
            "sourceUrl": "https://www.nj.gov/labor/myworkrights/worker-protections/workers_under_18/"
          },
          {
            "citation": "NJDOL MW-129 Child Labor Law Abstract (rev. 2/23)",
            "sourceUrl": "https://www.nj.gov/labor/wageandhour/assets/PDFs/Forms%20and%20Publications/MW-129%20(2-23)%20Child%20Labor%20Law%20Abstract%20Poster%20BW%20.pdf"
          }
        ],
        "confidence": "medium",
        "note": "The 9 p.m. summer end (from the minor's own last school day through Labor Day) requires written permission from a parent or guardian; as a conditional extension it is not encoded (summer and vacation null), so 19:00 applies all year - stricter than the law for a minor with that permission. The meal break is 30 minutes after 6 consecutive hours; breaks under 30 minutes do not interrupt continuous work. Under 16 has an overall 8 hours/day and 40 hours/week cap. School-sponsored cooperative education has separate limits (5 hours at the site, 8 combined). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": "23:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "N.J.S.A. 34:2-21.3, 34:2-21.4; N.J.A.C. 12:58",
            "sourceUrl": "https://www.nj.gov/labor/myworkrights/worker-protections/workers_under_18/"
          },
          {
            "citation": "NJDOL MW-129 Child Labor Law Abstract (rev. 2/23)",
            "sourceUrl": "https://www.nj.gov/labor/wageandhour/assets/PDFs/Forms%20and%20Publications/MW-129%20(2-23)%20Child%20Labor%20Law%20Abstract%20Poster%20BW%20.pdf"
          }
        ],
        "confidence": "medium",
        "note": "During summer vacation (the minor's last school day through Labor Day) the caps rise to 10 hours/day and 50 hours/week, still 6 days and 6 a.m.-11 p.m.; the schema has no seasonal hour caps, so 8/40 is kept (stricter than the law in summer). Two NJDOL sources disagree on later night work: the MW-129 poster lifts the 11 p.m. limit in school vacation and on nights not before a school day, WITH parental written permission; the current NJDOL 'Young Workers' page says until midnight on Fridays, Saturdays and days not followed by school. Encoded stricter: 23:00 on every night. Restaurants and seasonal amusements may employ 16+ until 3 a.m. in vacation with parental permission. A 17-year-old vocational-school graduate with certificate may work adult hours in the field of study."
      }
    ]
  },
  "US-NM": {
    "asOf": "2017-11-14",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "N.M. Stat. Ann. § 50-6-1",
      "sourceUrl": "https://www.nmlegis.gov/Sessions/07%20Regular/final/SB0175.html",
      "confidence": "medium",
      "note": "Children under 14 may not be employed at any gainful occupation 'unless otherwise provided for in the Child Labor Act'. The act's exceptions include performers and work for a parent."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school superintendent / principal / designated school issuing officer, or the Workforce Solutions Labor Relations Division director or designee",
      "citation": "N.M. Stat. Ann. §§ 50-6-2, 50-6-7; 11.1.4.9 NMAC",
      "sourceUrl": "https://www.srca.nm.gov/parts/title11/11.001.0004.html",
      "confidence": "high",
      "note": "The permit is issued on proof of age and a finding that the work is not dangerous or prohibited. The employer keeps it on file at the workplace. The NMAC says a permit is 'ordinarily required' for children under 16. Entertainment work by anyone under 18 instead needs a separate pre-authorization certificate."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.M. Stat. Ann. § 50-6-3 (as amended by 2007 SB 175)",
            "sourceUrl": "https://www.nmlegis.gov/Sessions/07%20Regular/final/SB0175.html"
          },
          {
            "citation": "11.1.4.9(D) NMAC",
            "sourceUrl": "https://www.srca.nm.gov/parts/title11/11.001.0004.html"
          }
        ],
        "confidence": "medium",
        "note": "The 7 p.m. end applies 'during the school year'; outside the school year the end is 9 p.m. The statute gives no calendar dates, so the later end is encoded as `vacation`, not a dated summer. Work during school hours is barred except in work-experience and career-exploration programs. The statute's subsection B lead-in reads 'over the age of fourteen or under the age of sixteen', an evident drafting slip for 'and' that a failed 2015 bill (SB 606) tried to fix."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.M. Stat. Ann. § 50-6-3",
            "sourceUrl": "https://www.nmlegis.gov/Sessions/07%20Regular/final/SB0175.html"
          }
        ],
        "confidence": "medium",
        "note": "§ 50-6-3 covers only ages 14–16. A 2015 bill (SB 606) to add 16–18 limits died, so New Mexico sets no hours limits for 16–17 in general (non-entertainment) employment."
      }
    ]
  },
  "US-NV": {
    "asOf": "2026-09-09",
    "effectiveFrom": null,
    "minimumAge": null,
    "workPermit": {
      "requiredUnder": 14,
      "issuer": "district court judge (or authorized designee) — written permission",
      "citation": "Nev. Rev. Stat. § 609.245",
      "sourceUrl": "https://www.leg.state.nv.us/NRS/NRS-609.html#NRS609Sec245",
      "confidence": "high",
      "note": "Nevada has no general work permit for 14–17. It requires written permission from a district judge or designee only for a child under 14 working in a store, shop, factory, mine or most other inside work. Farm work, housework and motion-picture work are excluded. The state superintendent or an attendance officer may demand proof of age, which the employer must produce within 10 days or stop employing the child (§ 609.260)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Nev. Rev. Stat. § 609.240(1)",
            "sourceUrl": "https://www.leg.state.nv.us/NRS/NRS-609.html#NRS609Sec240"
          },
          {
            "citation": "Nev. Rev. Stat. § 609.654",
            "sourceUrl": "https://www.leg.state.nv.us/NRS/NRS-609.html#NRS609Sec654"
          }
        ],
        "confidence": "high",
        "note": "Under 16: at most 8 hours a day and 40 a week, whether or not school is in session. Nevada's own statute sets no time-of-day window for this age. However, § 609.654 makes any violation of the FLSA child-labor hours rules for under-16s (29 C.F.R. Part 570) a violation of Nevada law too, so the federal limits are also state-enforceable. The statutory school-hours ban (§ 609.250) covers only children under 14."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Nev. Rev. Stat. § 609.240(2)",
            "sourceUrl": "https://www.leg.state.nv.us/NRS/NRS-609.html#NRS609Sec240"
          }
        ],
        "confidence": "high",
        "note": "The 11 p.m.-6 a.m. ban applies only on a night immediately before a school day, and only to a child who is enrolled in a public or private high school, is 16 to 18, and is not emancipated. So the 06:00 start binds only school-day mornings, and there is no limit before non-school days. The school district, the high school's governing body or a juvenile court may exempt a child in the child's best interest. Lifeguards, arcade employees, stage/theatrical and motion-picture performers and farm work are excluded. Added by Stats. 2025."
      }
    ]
  },
  "US-NY": {
    "asOf": "2024-02-16",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "N.Y. Lab. Law §§ 130, 131",
      "sourceUrl": "https://www.nysenate.gov/legislation/laws/LAB/131",
      "confidence": "high",
      "note": "§ 130 bars minors under 14 except in listed occupations (newspaper carrier, farm work, performers, etc.). 14–15 may work in non-factory trades only when not required to attend school and only with an employment certificate (§ 131)."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school district (the minor's school guidance office; non-students apply at the nearest school)",
      "citation": "N.Y. Lab. Law § 131; N.Y. Educ. Law art. 65 pt. 4; NYSDOL Working Papers",
      "sourceUrl": "https://dol.ny.gov/working-papers",
      "confidence": "medium",
      "note": "Certificates by age: AT-18 for 14–15, AT-19 for 16–17 in school, and AT-20 (full-time) for 16–17 out of school. Exempt from the requirement: home farm work, caddying, babysitting, home chores, casual non-power work at a nonprofit, and some college employment. NYSDOL mentions a digital working-papers process arriving in 2027. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-21",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.Y. Lab. Law § 142",
            "sourceUrl": "https://www.nysenate.gov/legislation/laws/LAB/142"
          },
          {
            "citation": "NYSDOL, Hours of Work for Minors",
            "sourceUrl": "https://dol.ny.gov/hours-work-minors"
          }
        ],
        "confidence": "high",
        "note": "A 'school week' (18-hour cap) is any week school is in session; a non-school week is one in which school is closed the entire calendar week. On a Saturday or other non-school day within a school week the cap is 8 hours. 7 a.m.-7 p.m. every day, to 9 p.m. June 21-Labor Day. Approved supervised work-study students may work 23 hours/week. Junior counselors at children's camps (June-August) are exempt from the time window. The ban on school-hours work comes from § 131, which allows work only when the minor is not required to attend school. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 28,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "22:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "N.Y. Lab. Law § 143",
            "sourceUrl": "https://www.nysenate.gov/legislation/laws/LAB/143"
          },
          {
            "citation": "NYSDOL, Hours of Work for Minors",
            "sourceUrl": "https://dol.ny.gov/hours-work-minors"
          }
        ],
        "confidence": "high",
        "note": "The school-week limits (4 hours on a day before a school day, 8 on Friday, Saturday, Sunday and holidays, 28 a week, 6 days, 6 a.m.-10 p.m.) apply only to minors attending day school while school is in session. maxHours.schoolDay 4 really applies to days that PRECEDE a school day (Mon-Thu plus Sunday); Friday allows 8. Later work during school weeks needs written parental consent: until midnight on a night before a non-school day, or on a school night if the school also certifies satisfactory academic standing - not encoded (22:00 every night). In vacation (school not in session), or for minors not attending school, the limits are 8 hours/day, 48/week, 6 days, and no work from midnight to 6 a.m.; the 22:00 end is therefore stricter than the law during vacations. In a holiday week, one 10-hour day and four 9-hour days are allowed within the 48. Co-op education students may work 6 hours on a day before a school day. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-OH": {
    "asOf": "2026-10-09",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Ohio Rev. Code § 3331.01 (age and schooling certificate issued only on proof child is at least 14); § 4109.02 (certificate a condition of employment)",
      "sourceUrl": "https://codes.ohio.gov/ohio-revised-code/section-3331.01",
      "confidence": "high",
      "note": "Ohio sets 14 indirectly: a minor of compulsory school age may not be employed without an age and schooling certificate, and the certificate may only issue to a child at least 14. Chapter 4109 exemptions (ORC 4109.06) cover e.g. employment by a parent, newspaper delivery, lawn mowing/snow shoveling, and high-school graduates."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school district superintendent (or nonpublic/community school chief administrative officer); filed electronically with the Director of Commerce",
      "citation": "Ohio Rev. Code §§ 4109.02, 3331.01",
      "sourceUrl": "https://codes.ohio.gov/ohio-revised-code/section-4109.02",
      "confidence": "high",
      "note": "Required for minors of compulsory school age. 16- and 17-year-olds need NO certificate for nonhazardous work during summer break (last day of spring term to first day of fall term) if they give the employer proof of age and a signed parent/guardian consent (ORC 4109.02(B)-(C)). Not required for high-school graduates (ORC 4109.06)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "09-01",
            "earliestStart": "07:00",
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Ohio Rev. Code § 4109.07(A)-(C)",
            "sourceUrl": "https://codes.ohio.gov/ohio-revised-code/section-4109.07"
          }
        ],
        "confidence": "high",
        "note": "Summer window June 1-September 1 as written (literal date, not Labor Day). The 9 p.m. end also applies during any school holiday of 5+ school days - not encoded as `vacation` because the schema cannot check the 5-day length (stricter). Work 7-9 p.m. on a night before a non-school day is allowed only with parent/guardian approval, so 19:00 is encoded on non-school nights too (stricter). Rest rule: no more than 5 consecutive hours without a 30-minute rest period (all minors). Section amended effective 2026-10-09 per the official page."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "23:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Ohio Rev. Code § 4109.07(C)-(D)",
            "sourceUrl": "https://codes.ohio.gov/ohio-revised-code/section-4109.07"
          }
        ],
        "confidence": "high",
        "note": "Time-of-day limits apply only to 16-17s required to attend school, and only on school days / nights before school days: no work before 7 a.m. on a school day (6 a.m. allowed if not employed after 8 p.m. the previous night), none after 11 p.m. before a school day. No state limit on non-school nights or non-school-day mornings. No daily/weekly hour caps. Hour restrictions may be modified by superintendent/juvenile court for hardship (ORC 4109.06(C)). High-school graduates are exempt from Chapter 4109."
      }
    ]
  },
  "US-OK": {
    "asOf": "2026-02-18",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Okla. Stat. tit. 40, § 71 et seq.; Oklahoma Department of Labor Child Labor Unit FAQ",
      "sourceUrl": "https://oklahoma.gov/labor/workplace-rights/child-labor/faqs---child-labor-unit.html",
      "confidence": "medium",
      "note": "Exempt: farm work, work for a parent or an entity in which a parent holds an equity interest, and newspaper sale/delivery. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "school principal/headmaster/administrative officer (parent for homeschooled children)",
      "citation": "Okla. Stat. tit. 40, § 71 et seq.; tit. 70, § 10; ODOL Child Labor Unit FAQ",
      "sourceUrl": "https://oklahoma.gov/labor/workplace-rights/child-labor/faqs---child-labor-unit.html",
      "confidence": "medium",
      "note": "Employment Certificate of Age and Schooling; employer must keep it on file. The FAQ does not state the age range outright; ODOL/CareerTech materials describe it as required for 14- and 15-year-olds. No permit for 16-17."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": "07:00",
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Okla. Stat. tit. 40, §§ 75, 77; ODOL Child Labor Unit FAQ",
            "sourceUrl": "https://oklahoma.gov/labor/workplace-rights/child-labor/faqs---child-labor-unit.html"
          }
        ],
        "confidence": "medium",
        "note": "ODOL says the 9 p.m. end on days followed by a non-school day applies year-round only where the employer is NOT covered by the federal FLSA (federal 7 p.m. is stricter otherwise). Also a 1-hour cumulative rest per 8 consecutive hours. No overtime for under-16. ODOL FAQ does not address work during school hours; statute text not opened. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "ODOL Child Labor Unit FAQ",
            "sourceUrl": "https://oklahoma.gov/labor/workplace-rights/child-labor/faqs---child-labor-unit.html"
          }
        ],
        "confidence": "medium",
        "note": "ODOL: 'There are no restrictions on the hours or times once the minor reaches 16 years of age', and no break requirements. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      }
    ]
  },
  "US-OR": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "ORS 653.305 et seq.; OAR ch. 839, div. 21; BOLI 'Minor Workers' page",
      "sourceUrl": "https://www.oregon.gov/boli/employers/pages/minor-workers.aspx",
      "confidence": "medium",
      "note": "BOLI may approve younger workers in specific industries (agriculture, entertainment); under-14 requires an employment permit. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "BOLI Child Labor Unit — the EMPLOYER's annual validated employment certificate (not a per-minor permit)",
      "citation": "ORS 653.307; OAR 839-021-0220; BOLI 'Minor Workers' page",
      "sourceUrl": "https://www.oregon.gov/boli/employers/pages/minor-workers.aspx",
      "confidence": "medium",
      "note": "Oregon is unusual: 'All employers must have a certificate to employ minors under 18', obtained annually by the employer from BOLI and posted at the worksite. Minors 14-17 do NOT get individual work permits. A consumer modeling a per-minor permit should treat this as an employer-level requirement. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": "07:00",
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "OAR 839-021-0070 (hours, under 16); OAR 839-021-0072 (meal/rest periods)",
            "sourceUrl": "https://www.oregon.gov/boli/employers/pages/minor-workers.aspx"
          },
          {
            "citation": "OAR 839-021-0070",
            "sourceUrl": "https://oregon.public.law/rules/oar_839-021-0070"
          }
        ],
        "confidence": "medium",
        "note": "Meal period: 30 min for any work period of 6+ hours; the adult meal-period exceptions do not apply to 14-15. Also a paid 15-minute rest break per 4-hour segment (or major portion) for all minors. Exceptions for student-learner and school-supervised work experience programs. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": 44,
          "nonSchoolWeek": 44,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "OAR 839-021-0067 (hours, 16-17); OAR 839-021-0072 (meal/rest periods)",
            "sourceUrl": "https://www.law.cornell.edu/regulations/oregon/Or-Admin-Code-SS-839-021-0067"
          },
          {
            "citation": "BOLI 'Minor Workers' page",
            "sourceUrl": "https://www.oregon.gov/boli/employers/pages/minor-workers.aspx"
          }
        ],
        "confidence": "medium",
        "note": "44 hours/week cap regardless of school; more requires a BOLI Special Emergency Overtime Permit. No daily or time-of-day limit (except messenger/delivery work 10 p.m.-5 a.m.). Paid 15-minute rest break per 4-hour segment. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      }
    ]
  },
  "US-PA": {
    "asOf": "2022-11-03",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Child Labor Act, Act of Oct. 17, 2012, P.L. 1209, No. 151, § 3(c) (43 P.S. § 40.3(c))",
      "sourceUrl": "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?txtType=PDF&SessYr=2012&ActNum=0151.&SessInd=0",
      "confidence": "high",
      "note": "'Except as set forth under sections 4(d) and 5, no individual under 14 years of age may be employed' (exceptions: e.g. caddies, farm/domestic work, performers)."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "school district issuing officer (district superintendent / supervising principal or designee)",
      "citation": "Child Labor Act § 8(a), § 9 (43 P.S. §§ 40.8, 40.9)",
      "sourceUrl": "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?txtType=PDF&SessYr=2012&ActNum=0151.&SessInd=0",
      "confidence": "high",
      "note": "Every minor (under 18) needs a transferable work permit; under-16s ALSO need a signed parent/guardian statement acknowledging duties and hours, which the employer must receive before employment. Newspaper sellers over 16 exempt."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Child Labor Act § 3(a), (b), (d), (e) (43 P.S. § 40.3)",
            "sourceUrl": "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?txtType=PDF&SessYr=2012&ActNum=0151.&SessInd=0"
          }
        ],
        "confidence": "high",
        "note": "During a 'school vacation period' (not fixed dates) the end extends to 9 p.m. - encoded as `vacation`. L&I may by regulation allow non-FLSA employers until 10 p.m. A minor in summer school stays at the 18-hour school-week cap. Rest break: no more than 5 hours continuously without a 30-minute break (all minors). Max 6 consecutive days (all minors). School-work program students: work + school hours may not exceed 8/day."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 28,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "24:00",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "25:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Child Labor Act § 3(a), (b), (f) (43 P.S. § 40.3)",
            "sourceUrl": "https://www.palegis.us/statutes/unconsolidated/law-information/view-statute?txtType=PDF&SessYr=2012&ActNum=0151.&SessInd=0"
          },
          {
            "citation": "PA L&I press release, 2026-08-31",
            "sourceUrl": "https://www.pa.gov/agencies/dli/newsroom/back-to-school--back-to-work--shapiro-administration-reminds-emp"
          }
        ],
        "confidence": "high",
        "note": "While school is in session: 6 a.m.-midnight ('24:00'), 8 h/day ('in a single day', so every day of a school week, weekends included), 28 h per regular school week - L&I reads this as 28 Mon-Fri plus up to 8 hours each on Sat/Sun (28 kept as stricter). During a school vacation period: until 1 a.m. ('25:00', encoded as `vacation`), 10 h/day, 48 h/week with hours over 44 voluntary. Because the schema's nonSchoolDay cap cannot tell a school-week weekend from a vacation day, it is encoded as 8 (stricter; vacation days really allow 10). Summer-school enrollees stay on school-session limits. These limits do NOT apply to high-school graduates or those exempt from compulsory attendance. The Act defines hours of employment as hours outside the school hours set by the school district, so work during school hours is barred (encoded)."
      }
    ]
  },
  "US-RI": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "R.I. Gen. Laws § 28-3-1",
      "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-1.htm",
      "confidence": "high",
      "note": "'No child under fourteen (14) years of age shall be employed ... in any business or industrial establishment.' Under-16s also barred from factories/mechanical/manufacturing establishments."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "city/town school committee (school department) or its designee; form prescribed by RI DLT",
      "citation": "R.I. Gen. Laws §§ 28-3-1, 28-3-3",
      "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-3.htm",
      "confidence": "high",
      "note": "14-15 may work in a business establishment only under a 'special limited permit to work' (§ 28-3-1 'except as provided in § 28-3-3'). Since 2022 the child must first complete a DLT workers'-rights/safety training (max 3 hours, virtual). 16-17: DLT describes a 'Certificate of Age' from the school department as obtainable but the statutes read do not make it a condition of employment; employers also file DLT's 'Intention to Employ a Minor' form (per DLT materials)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 40,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "R.I. Gen. Laws § 28-3-1 (time of day)",
            "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-1.htm"
          },
          {
            "citation": "R.I. Gen. Laws § 28-3-3 (permit only for hours school not in session)",
            "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-3.htm"
          },
          {
            "citation": "R.I. Gen. Laws § 28-3-11(a) (8/day, 40/week)",
            "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-11.htm"
          }
        ],
        "confidence": "high",
        "note": "State caps are 8 h/day and 40 h/week regardless of school (federal 3/18 is stricter in session). End time extends to 9 p.m. 'only during school vacations' (not dates) - encoded as `vacation`. 8-hour rest interval between workdays. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 9,
          "nonSchoolDay": 9,
          "schoolWeek": 48,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": "06:00",
          "latestEndBeforeSchoolDay": "23:30",
          "latestEndBeforeNonSchoolDay": "25:30",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "R.I. Gen. Laws § 28-3-11",
            "sourceUrl": "http://webserver.rilegislature.gov/Statutes/TITLE28/28-3/28-3-11.htm"
          }
        ],
        "confidence": "high",
        "note": "48 h/week and 9 h/day (9 3/5 h/day when 48 hours are worked in 5 days); 8-hour rest between workdays. The 6 a.m./11:30 p.m. (1:30 a.m., '25:30', before a non-school day) limits apply only to minors regularly attending school. During school VACATIONS there is no limit on daily or weekly hours (§ 28-3-11(c)); the nonSchoolDay 9 is the in-session rule for a weekend day and is stricter than the law in vacations. A meal or rest break rule that covers all employees, not minors only, is outside this package."
      }
    ]
  },
  "US-SC": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "S.C. Code § 41-13-20 and LLR child labor regulations (summary)",
      "sourceUrl": "https://llr.sc.gov/wage/cll.aspx",
      "confidence": "medium",
      "note": "LLR: employment under 14 is generally 'oppressive child labor'. Exemptions: performers, 12-13 in some farm work, any age in a business 100% owned and operated by a parent, newspaper delivery. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "S.C. Code § 41-13-20; SC LLR Child Labor Regulations Summary",
            "sourceUrl": "https://llr.sc.gov/wage/cll.aspx"
          }
        ],
        "confidence": "medium",
        "note": "LLR frames limits by 'school sessions' vs 'non-school sessions (such as summer vacations)': during non-school sessions 8 h/day, 40 h/week, 7 a.m.-9 p.m. No fixed summer dates are given, so the 9 p.m. end is encoded as `vacation`. The 3 h/day cap is per day during a school session (LLR does not distinguish a Saturday within a school week). No state break rule found on the LLR page (a secondary claim of a 30-minute break was not confirmed). Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "SC LLR Child Labor Regulations Summary",
            "sourceUrl": "https://llr.sc.gov/wage/cll.aspx"
          }
        ],
        "confidence": "medium",
        "note": "Exempt from hour and scheduling restrictions; FLSA hazardous orders still apply. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      }
    ]
  },
  "US-SD": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": null,
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 0,
        "maxAge": 13,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 20,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "SDCL § 60-12-2 (under 14)",
            "sourceUrl": "https://sdlegislature.gov/Statutes/60-12-2"
          },
          {
            "citation": "SDCL §§ 60-12-1, 60-12-1.1 (under 16)",
            "sourceUrl": "https://sdlegislature.gov/Statutes/60-12-1"
          }
        ],
        "confidence": "high",
        "note": "South Dakota sets NO general minimum age: a child under 14 may be employed in a mercantile establishment (never a factory, workshop or mine) only while the child's school is not in session and never after 7 p.m. (every day). The under-16 hour caps of § 60-12-1 also apply. minAge 0 here means 'no state floor'; federal FLSA (14) still applies to covered employers."
      },
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 20,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "SDCL §§ 60-12-1, 60-12-1.1",
            "sourceUrl": "https://sdlegislature.gov/Statutes/60-12-1"
          },
          {
            "citation": "SD DLR Youth Employment page",
            "sourceUrl": "https://dlr.sd.gov/employment_laws/youth_employment.aspx"
          }
        ],
        "confidence": "high",
        "note": "Applies to UNEMANCIPATED children under 16. 'School day/week' = days/weeks the child's own school or program operates and the child is expected to attend (§ 60-12-1.1). 10 p.m. limit applies only on a night preceding a school day; no state limit on other nights and no state earliest start. Exceptions: child actors/performers; roguing/detasselling seed corn on non-school days. State caps (4/day, 20/week in school) are looser than federal (3/18), and DLR notes federal applies where stricter."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "SDCL ch. 60-12 (no hour provisions for 16+)",
            "sourceUrl": "https://sdlegislature.gov/Statutes/60-12"
          }
        ],
        "confidence": "high",
        "note": "No state hour or time-of-day limits for 16-17."
      }
    ]
  },
  "US-TN": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Tenn. Code Ann. § 50-5-103; TDLWD support article 'At what age can a minor legally begin work'",
      "sourceUrl": "https://lwdsupport.tn.gov/hc/en-us/articles/360000134948-At-what-age-can-a-minor-legally-begin-work",
      "confidence": "medium",
      "note": "TDLWD: a minor must be 14 to be employed; exception for work in a parent's/guardian's own business. Statute text itself not opened."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": null,
          "vacation": {
            "earliestStart": "06:00",
            "latestEnd": "21:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Tenn. Code Ann. §§ 50-5-104, 50-5-115; TDLWD Child Labor Act page",
            "sourceUrl": "https://www.tn.gov/workforce/employees/labor-laws/labor-laws-redirect/child-labor.html"
          }
        ],
        "confidence": "medium",
        "note": "TDLWD frames limits by 'while school is in session' (3 h/day, 18 h/week, 7 a.m.-7 p.m.) vs 'while school is not in session' (8 h/day, 40 h/week, 6 a.m.-9 p.m.). Because the state ties the 6 a.m.-9 p.m. window to periods when school is not in session (no dates), it is encoded as `vacation`. 'Required to attend class' hours are off-limits. Break: 30-minute unpaid break/meal period if scheduled 6 consecutive hours, not scheduled during or before the first hour; the adult break waiver does not apply to under-18s. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "06:00",
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Tenn. Code Ann. § 50-5-105(b)-(c); § 50-5-115; TDLWD Child Labor Act page",
            "sourceUrl": "https://www.tn.gov/workforce/employees/labor-laws/labor-laws-redirect/child-labor.html"
          }
        ],
        "confidence": "medium",
        "note": "10 p.m.-6 a.m. ban applies only Sunday through Thursday nights preceding a school day (so the 06:00 start binds only school-day mornings). With a signed Parental Consent Form kept in the personnel file, the minor may work until midnight on no more than 3 nights per week (Sun-Thu) - not encoded (stricter). Not during hours the minor is required to attend class (waived for church-related-school and consenting home-schooled students with a director's letter). No daily/weekly hour caps. Same 30-minute break rule as 14-15. Confidence medium: the linked source is an agency summary or an unofficial copy of the text, not the official code."
      }
    ]
  },
  "US-TX": {
    "asOf": "2021-09-01",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Tex. Lab. Code § 51.011",
      "sourceUrl": "https://www.twc.texas.gov/sites/default/files/ui/docs/chapter-51-employment-of-children-twc.pdf",
      "confidence": "high",
      "note": "'Except as provided by this chapter, a person commits an offense if the person employs a child under 14.' Chapter does not apply (§ 51.003) to e.g. nonhazardous work in a parent's business under parent supervision, newspaper delivery (11+), school work-study, or parent-consented nonhazardous casual employment. Performers under 14 by TWC rule (§ 51.012)."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": 48,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Tex. Lab. Code § 51.013",
            "sourceUrl": "https://www.twc.texas.gov/sites/default/files/ui/docs/chapter-51-employment-of-children-twc.pdf"
          }
        ],
        "confidence": "high",
        "note": "State caps are 8 h/day and 48 h/week regardless of school (federal 3/18/40 and 7 a.m.-7 p.m./9 p.m. are stricter for FLSA-covered employers). Time-of-day limits for a child enrolled in a school term: no work 10 p.m.-5 a.m. on a day followed by a school day, midnight ('24:00')-5 a.m. on a day not followed by a school day; during summer recess (not in summer school), midnight-5 a.m. on any day - the same as the non-school-night end, so no separate summer/vacation entry. TWC may grant an individual hardship exemption from all of § 51.013. No state rule on work during school hours or meal breaks."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Tex. Lab. Code ch. 51 (no hour provisions for 16+)",
            "sourceUrl": "https://www.twc.texas.gov/sites/default/files/ui/docs/chapter-51-employment-of-children-twc.pdf"
          }
        ],
        "confidence": "high",
        "note": "No state hour or time-of-day limits for 16-17; hazardous-occupation rules (§ 51.014, 40 TAC ch. 817) still apply."
      }
    ]
  },
  "US-UT": {
    "asOf": "2024-05-01",
    "effectiveFrom": "2024-05-01",
    "minimumAge": null,
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Utah Code § 34-23-202 (eff. 2024-05-01)",
            "sourceUrl": "https://le.utah.gov/xcode/Title34/Chapter23/34-23-S202.html"
          },
          {
            "citation": "Utah Admin. Code R610-2-3",
            "sourceUrl": "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R610-2-3"
          }
        ],
        "confidence": "high",
        "note": "Hours apply to all minors under 16 'except as provided in the exemptions described in 29 U.S.C. Sec. 213 and the exceptions described in 29 C.F.R. Sec. 570.35'. The statute says 'eight hours in one calendar day' and '40 hours in one calendar week' without restricting them to non-school days/weeks (the 3 h / 18 h school-day/school-week caps are the stricter ones when school is in session). No work during school hours 'except as authorized by the proper school authorities'. Summer: June 1 through Labor Day, may work until 9:00 p.m. Meal/rest (R610-2-3, all minors): 30-minute meal period no later than 5 hours after the start of the workday (paid if not fully relieved); plus a paid 10-minute rest per 4 hours or fraction, and no more than 3 consecutive hours without a 10-minute rest. The Division may authorize work outside these times/occupations in writing (34-23-207(5); Application for Authorization to Employ a Minor). The Labor Commission's own web page still described the pre-2024 rule (4 h school day, until 9:30 p.m.) when checked via search — the statute (amended by Laws 2024 ch. 221, SB 248) controls."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Utah Code § 34-23-203",
            "sourceUrl": "https://le.utah.gov/xcode/Title34/Chapter23/34-23-S203.html"
          },
          {
            "citation": "Utah Code § 34-23-208",
            "sourceUrl": "https://le.utah.gov/xcode/Title34/Chapter23/34-23-S208.html"
          },
          {
            "citation": "Utah Admin. Code R610-2-3",
            "sourceUrl": "https://www.law.cornell.edu/regulations/utah/Utah-Admin-Code-R610-2-3"
          }
        ],
        "confidence": "high",
        "note": "No state hours or time-of-day limits for 16–17 (34-23-202 covers only under 16; 34-23-203 lets 16+ work in all non-hazardous occupations). Meal/rest rule R610-2-3 applies to every 'minor employee' (Utah: under 18): 30-minute meal no later than 5 hours into the workday, paid 10-minute rest per 4 hours, no more than 3 consecutive hours without a rest. The whole chapter does not apply to a 16- or 17-year-old who has a high school diploma, a school release certificate, is legally married, or is head of a household (34-23-208)."
      }
    ]
  },
  "US-VA": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Va. Code § 40.1-78(A)",
      "sourceUrl": "https://law.lis.virginia.gov/vacode/title40.1/chapter5/section40.1-78/",
      "confidence": "high",
      "note": "No child under 14 may be employed except as the chapter specifies (exemptions in § 40.1-79.01: e.g., a child under 16 employed by a parent in an occupation other than manufacturing; 12+ sports referees for nonprofit/government programs; 12–13 farm work with parental consent)."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "Virginia Department of Labor and Industry (online VAeECS portal, or paper Permission-to-Employ + Employer Intent-to-Employ forms)",
      "citation": "Va. Code §§ 40.1-84, 40.1-87, 40.1-92",
      "sourceUrl": "https://law.lis.virginia.gov/vacodefull/title40.1/chapter5/",
      "confidence": "high",
      "note": "Employment certificate required before a 14–15-year-old does any work; needs a firm job offer and parent/guardian permission; free. For 16+, an age certificate is issued only on request of the employer or worker (§ 40.1-104)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "16VAC15-40-30",
            "sourceUrl": "https://law.lis.virginia.gov/admincode/title16/agency15/chapter40/section30/"
          },
          {
            "citation": "Va. Code § 40.1-80.1",
            "sourceUrl": "https://law.lis.virginia.gov/vacode/title40.1/chapter5/section40.1-80.1/"
          },
          {
            "citation": "Va. Code § 40.1-78(B)",
            "sourceUrl": "https://law.lis.virginia.gov/vacode/title40.1/chapter5/section40.1-78/"
          }
        ],
        "confidence": "high",
        "note": "16VAC15-40-30(A): no work during school hours; max 40 h in a week school is not in session, 18 h in a week school is in session, 8 h on a non-school day, 3 h on a school day; not before 7 a.m. or after 7 p.m., except June 1 through Labor Day until 9 p.m. (B) and § 40.1-80.1(B): no more than 5 hours continuously without at least a 30-minute lunch interval (a shorter break does not interrupt the period). § 40.1-80.1(A) directs these regulations to incorporate the FLSA standards, so they mirror 29 C.F.R. 570.35. School-hours work is allowed only for 14+ in an approved work-training program with a work-training certificate (§ 40.1-78(B))."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Va. Code § 40.1-80.1",
            "sourceUrl": "https://law.lis.virginia.gov/vacode/title40.1/chapter5/section40.1-80.1/"
          },
          {
            "citation": "16VAC15-40-20",
            "sourceUrl": "https://law.lis.virginia.gov/admincode/title16/agency15/chapter40/section20/"
          }
        ],
        "confidence": "medium",
        "note": "No Virginia hours or time-of-day limits for 16-17 (the hours regulation covers only minors under 16). mealBreak is UNCERTAIN and encoded stricter: § 40.1-80.1(B) reads 'No child shall be employed or permitted to work for more than five hours continuously without an interval of at least 30 minutes for a lunch period' - unlike subsection A it is not limited to 'under 16'; however 16VAC15-40-30(B) and DOLI's youth page apply the 30-minute rule only to under-16s."
      }
    ]
  },
  "US-VT": {
    "asOf": "2024-07-01",
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "21 V.S.A. § 436",
      "sourceUrl": "https://legislature.vermont.gov/statutes/fullchapter/21/005",
      "confidence": "high",
      "note": "A child under 14 may not be employed in any gainful occupation unless the Commissioner of Labor has approved that occupation by rule as appropriate for under-14s AND the work is during vacation or before/after school. Exempt: employment by a parent (other than manufacturing, mining, or federally hazardous work), newspaper carriers, and performers."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "Vermont Commissioner of Labor (Department of Labor) certificate, deposited with the employer",
      "citation": "21 V.S.A. §§ 431, 432",
      "sourceUrl": "https://legislature.vermont.gov/statutes/fullchapter/21/005",
      "confidence": "high",
      "note": "ONLY needed when the under-16 works during school sessions: § 431 says the certificate requirement 'shall not apply to any child employed during vacations or before or after sessions of school' (Vermont DOL WH-30 agrees). An after-school, weekend or summer job for a 14-15-year-old needs no Vermont certificate. Issuance requires school record, proof of age, and a Vermont physician's fitness certificate (§ 432)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "21 V.S.A. § 434",
            "sourceUrl": "https://legislature.vermont.gov/statutes/fullchapter/21/005"
          },
          {
            "citation": "21 V.S.A. § 437(b)",
            "sourceUrl": "https://legislature.vermont.gov/statutes/fullchapter/21/005"
          }
        ],
        "confidence": "high",
        "note": "§ 434(a): no more than 8 hours in any day, 6 days in any week, not before 7 a.m. or after 7 p.m., except June 1 through Labor Day until 9 p.m. § 434(b): no more than 3 hours on any day school is in session and 18 hours in any week school is in session. § 437(b): no more than 8 hours in any day or 40 hours in any week. The statute does not itself bar work during school hours; it requires the Commissioner's certificate for it (§ 431) - encoded as no work during school hours (stricter), since an employer without that certificate may not schedule it. No minor-specific meal break (the general 21 V.S.A. § 304 'reasonable opportunity' rule applies to all employees). Does not apply to newspaper carriers, agriculture, or domestic service."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "21 V.S.A. §§ 430–438",
            "sourceUrl": "https://legislature.vermont.gov/statutes/fullchapter/21/005"
          }
        ],
        "confidence": "high",
        "note": "No Vermont hours, days, or time-of-day limits for 16–17 (§§ 434 and 437(b) are expressly 'under 16 years of age'). Only the hazardous-occupation bar (§ 437(a)) applies to all children under 18."
      }
    ]
  },
  "US-WA": {
    "asOf": "2026-07-01",
    "effectiveFrom": "2026-07-01",
    "minimumAge": {
      "age": 14,
      "citation": "WAC 296-125-018; RCW 26.28.060",
      "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true",
      "confidence": "high",
      "note": "A minor under 14 may be hired for work in or connected with any store, shop, factory, mine, or inside employment (other than farm or housework) only with a written order of a superior court judge of the county where the minor lives."
    },
    "workPermit": {
      "requiredUnder": 18,
      "issuer": "Employer-held: a minor work permit endorsement on the employer's business license (approved by Labor & Industries, issued by the state Business Licensing Service), plus a parent/school authorization form for each minor",
      "citation": "WAC 296-125-031, 296-125-041, 296-125-061",
      "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true",
      "confidence": "high",
      "note": "Applies to every minor under 18. The endorsement is per work location and expires yearly. The parent/school authorization form (signed by employer, minor, parent and — during the school year — a school official) expires each September 30; a summer-only parent authorization form is used for summer hires, and school approval is needed before continuing once school resumes. Emancipated minors (court order) are excepted from the parent/school form."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 16,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "21:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 4,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "WAC 296-125-101(1)",
            "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true"
          },
          {
            "citation": "WAC 296-125-111",
            "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true"
          }
        ],
        "confidence": "high",
        "note": "School weeks: max 3 h on a school day that precedes another school day, otherwise 8 h (so a Friday school day may be up to 8 h; 3 kept as stricter); 16 h/week; 6 days; 7 a.m.-7 p.m. on days preceding a school day; until 9 p.m. on Fridays, Saturdays and days preceding a school holiday or vacation; not during school hours. Non-school weeks (school not in session that week): 8 h/day, 40 h/week, 6 days, 7 a.m.-9 p.m. Past 8 p.m. in service occupations a responsible adult employee must be on the premises. Breaks: 30-minute uninterrupted meal break no later than after 4 consecutive hours, plus a paid 10-minute rest break so that no more than 2 consecutive hours are worked without a meal or rest break."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": 4,
          "nonSchoolDay": 8,
          "schoolWeek": 20,
          "nonSchoolWeek": 48,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": {
            "earliestStart": null,
            "latestEnd": "24:00"
          }
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "WAC 296-125-101(2)-(4)",
            "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true"
          },
          {
            "citation": "WAC 296-125-121",
            "sourceUrl": "https://app.leg.wa.gov/WAC/default.aspx?cite=296-125&full=true"
          }
        ],
        "confidence": "high",
        "note": "School weeks: max 4 h on a school day preceding another school day, otherwise 8 h (4 kept as stricter); 20 h/week; 6 days; 7 a.m.-10 p.m. on days preceding a school day; until midnight ('24:00') on Fridays, Saturdays and days before a school holiday/vacation; not during school hours. Non-school weeks: 8 h/day, 48 h/week, 6 days, 5 a.m.-midnight (encoded as `vacation`). Past 8 p.m. in service occupations a responsible adult must be on the premises. Breaks: 30-minute uninterrupted meal break no later than after 5 consecutive hours; paid 10-minute rest break when working 4+ hours and no more than 3 hours without a rest break. Exceptions: minors with a certificate of educational competence, in a bona fide college program, in a state-approved CTE/worksite-learning program, or who are a parent may work non-school-week hours year-round (§ 101(4)); school-hours work is allowed for minors at an alternative/private school (outside their own school's hours), home-schooled, released for worksite learning, or excused by the superintendent (§ 101(3)). Special variances can raise school-week hours (WAC 296-125-161). The 5 a.m. start is allowed only in a non-school week; because a vacation day can fall inside a school week, 07:00 is kept on vacation days (stricter)."
      }
    ]
  },
  "US-WI": {
    "asOf": "2026-06-01",
    "effectiveFrom": "2026-06-01",
    "minimumAge": {
      "age": 14,
      "citation": "Wis. Stat. § 103.71(2); Wis. Admin. Code DWD 270.10",
      "sourceUrl": "https://docs.legis.wisconsin.gov/document/administrativecode/DWD%20270.10",
      "confidence": "high",
      "note": "Under 14 may not work in any gainful occupation except listed exceptions to the extent FLSA allows: 12+ in their own school's lunch program, street trades, farming, domestic work in a home; 11–13 football ball monitors; 12–13 sideline/athletic officials; public exhibitions; any age in a parent's/guardian's business under their direct supervision."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "Wisconsin Department of Workforce Development or a designated permit officer (school boards are designated by default)",
      "citation": "Wis. Stat. §§ 103.70, 103.695, 103.73; DWD 270.05",
      "sourceUrl": "https://docs.legis.wisconsin.gov/document/statutes/103.70",
      "confidence": "high",
      "note": "Permit required before a minor under 16 starts work; valid only for the employer named; needs proof of age and the employer's letter of intent to employ. Not required for domestic work in a home, work in a parent's business, 12+ farming, or 14+ youth apprentices. Since 2017 Wis. Act 11, 16–17-year-olds need no permit; a certificate of age is available from DWD/designees on request (§ 103.75)."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": 6,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Wis. Stat. § 103.68(1)-(3)",
            "sourceUrl": "https://docs.legis.wisconsin.gov/document/statutes/103.68"
          },
          {
            "citation": "Wis. Admin. Code DWD 270.11",
            "sourceUrl": "https://docs.legis.wisconsin.gov/document/administrativecode/DWD%20270.11"
          }
        ],
        "confidence": "high",
        "note": "§ 103.68(2): max 3 h on a school day or 8 h on a non-school day; 18 h in a school week or 40 h in a non-school week; 6 days a week; not before 7 a.m. or after 7 p.m. from the day after Labor Day to May 31, and not before 7 a.m. or after 9 p.m. June 1 to Labor Day (does not apply to domestic service, farm labor or public exhibitions). § 103.68(1): no work during hours the minor is required to attend school. § 103.68(3): a 30-minute meal period, and no minor under 18 may work more than 6 consecutive hours without one. DWD 270.11 (as amended eff. 6/1/26): work-experience-program hours during school don't count toward the caps; home-schooled 12–15 work public-school hours; charter-school students may not work during their scheduled charter-school hours."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 6,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "Wis. Stat. § 103.68(1), (3)",
            "sourceUrl": "https://docs.legis.wisconsin.gov/document/statutes/103.68"
          }
        ],
        "confidence": "high",
        "note": "No Wisconsin hours, days, or time-of-day limits for 16–17 (removed by 2011 Wis. Act 32; DWD 270.11's remaining 16–17 rules were repealed by CR 26-015, eff. 6/1/26). Still applies: no work during hours the minor is required to attend school under § 118.15 (compulsory attendance generally runs to age 18 or graduation), and a 30-minute meal period with no more than 6 consecutive hours without one."
      }
    ]
  },
  "US-WV": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "W. Va. Code § 21-6-1",
      "sourceUrl": "https://code.wvlegislature.gov/21-6-1/",
      "confidence": "high",
      "note": "Under 14 may work only in non-hazardous agriculture/horticulture, domestic service in the employer's residence, for a parent/guardian in their solely owned business (not § 21-6-2 jobs), as performers, and in newspaper delivery."
    },
    "workPermit": {
      "requiredUnder": 16,
      "issuer": "West Virginia Commissioner of Labor (Division of Labor) age certificate, plus written parental consent kept on file by the employer",
      "citation": "W. Va. Code §§ 21-6-3, 21-6-5",
      "sourceUrl": "https://code.wvlegislature.gov/21-6-5/",
      "confidence": "high",
      "note": "2025 SB 427 repealed the school-issued work permit (§ 21-6-4) and blanket permits (§ 21-6-8a). A 14- or 15-year-old may now work when the employer keeps on file (1) the written consent of a parent/guardian/custodian (§ 21-6-3) and (2) an age certificate issued by the Commissioner of Labor (§ 21-6-5(a)), which certifies proof of age, school attendance, the job, the consent and the permitted hours. For a minor claiming to be 16+, the Commissioner issues an age certificate only on the employer's request."
    },
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 3,
          "nonSchoolDay": 8,
          "schoolWeek": 18,
          "nonSchoolWeek": 40,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "07:00",
          "earliestStartNonSchoolDay": "07:00",
          "latestEndBeforeSchoolDay": "19:00",
          "latestEndBeforeNonSchoolDay": "19:00",
          "summer": {
            "from": "06-01",
            "to": "labor-day",
            "earliestStart": null,
            "latestEnd": "21:00"
          },
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": {
          "afterHours": 5,
          "minutes": 30
        },
        "citations": [
          {
            "citation": "W. Va. Code § 21-6-7",
            "sourceUrl": "https://code.wvlegislature.gov/21-6-7/"
          }
        ],
        "confidence": "high",
        "note": "No work during school hours (except approved work experience/career exploration programs); not before 7 a.m. or after 7 p.m., except June 1 through Labor Day until 9 p.m.; max 3 h on days public schools are in session, 18 h in weeks public schools are in session, 8 h on days public schools are not in session, 40 h in weeks they are not; no more than 5 hours continuously without at least a 30-minute lunch interval. Note the statute keys school days/weeks to PUBLIC school sessions. Does not apply to the under-14 jobs in § 21-6-1 (farm, domestic, parent's business, performers, newspaper delivery)."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "W. Va. Code § 21-6-2(a), (d)",
            "sourceUrl": "https://code.wvlegislature.gov/21-6-2/"
          }
        ],
        "confidence": "high",
        "note": "No West Virginia hours or time-of-day limits for 16–17 (§ 21-6-7 covers only under 16). 16–17 may work in any occupation not federally hazardous, not expressly prohibited by state law, and not designated dangerous by the Commissioner's legislative rule; under-18s may not work in a bar or serve alcohol except the supervised retail-sales exceptions (§ 21-6-2(c))."
      }
    ]
  },
  "US-WY": {
    "asOf": null,
    "effectiveFrom": null,
    "minimumAge": {
      "age": 14,
      "citation": "Wyo. Stat. § 27-6-107",
      "sourceUrl": "https://wyoleg.gov/statutes/compress/title27.pdf",
      "confidence": "high",
      "note": "Under 14 may work only in farm, domestic, or lawn and yard service; § 27-6-113(b) also allows under-14s in nonhazardous work outside school hours for a parent, grandparent or legal guardian or their business."
    },
    "workPermit": null,
    "personalCareNote": null,
    "bands": [
      {
        "minAge": 14,
        "maxAge": 15,
        "maxHours": {
          "schoolDay": 8,
          "nonSchoolDay": 8,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": "05:00",
          "earliestStartNonSchoolDay": "05:00",
          "latestEndBeforeSchoolDay": "22:00",
          "latestEndBeforeNonSchoolDay": "24:00",
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": true,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Wyo. Stat. § 27-6-110",
            "sourceUrl": "https://wyoleg.gov/statutes/compress/title27.pdf"
          },
          {
            "citation": "Wyo. Stat. § 27-6-111",
            "sourceUrl": "https://wyoleg.gov/statutes/compress/title27.pdf"
          },
          {
            "citation": "Wyo. Stat. § 27-6-107, -108",
            "sourceUrl": "https://wyoleg.gov/statutes/compress/title27.pdf"
          }
        ],
        "confidence": "high",
        "note": "§ 27-6-110(a): no more than 8 hours in any 12-hour period (encoded as 8 for both school and non-school days; Wyoming sets no separate school-day cap), not before 5:00 a.m., not after 10:00 p.m. on nights followed by a school day, not after midnight (encoded '24:00') on nights not followed by a school day. No weekly or days-per-week cap. § 27-6-111: an under-16 enrolled in a Wyoming public or private school may not work while that school's classes are in session. § 27-6-110(b): 14–15-year-olds NOT enrolled in school may work an 8-hour period between 5 a.m. and midnight any day. No meal-break rule. Excludes farm and domestic service. Federal FLSA limits for 14–15 are much stricter and will govern in practice."
      },
      {
        "minAge": 16,
        "maxAge": 17,
        "maxHours": {
          "schoolDay": null,
          "nonSchoolDay": null,
          "schoolWeek": null,
          "nonSchoolWeek": null,
          "schoolDayIncludingSchool": null
        },
        "maxDaysPerWeek": null,
        "window": {
          "earliestStartSchoolDay": null,
          "earliestStartNonSchoolDay": null,
          "latestEndBeforeSchoolDay": null,
          "latestEndBeforeNonSchoolDay": null,
          "summer": null,
          "vacation": null
        },
        "noWorkDuringSchoolHours": false,
        "mealBreak": null,
        "citations": [
          {
            "citation": "Wyo. Stat. §§ 27-6-107 to 27-6-114",
            "sourceUrl": "https://wyoleg.gov/statutes/compress/title27.pdf"
          }
        ],
        "confidence": "high",
        "note": "No Wyoming hours or time-of-day limits for 16-17: § 27-6-110 applies only to children under 16. (Some secondary sources wrongly attach the 5 a.m./10 p.m. limits to 16+; the statute text says 'under sixteen (16) years of age'.)"
      }
    ]
  }
};

module.exports = { AS_OF, JURISDICTIONS };

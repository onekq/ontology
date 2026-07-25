# Changelog — Elmsworth County Ontology

Flat list of the 10 resolutions from [Stage 3 — Resolve](../stages/03-resolve.html), plus the
2 requirements folded into existing conflicts rather than resolved separately.

1. **SVC-2201 / SVC-2201-ON** modeled as one **CPSV-AP** `PublicService` with two real `Channel`
   instances, not two services. A domain `channelRequirementVariance` flag marks that the online
   channel doesn't support the veteran fee-waiver code the in-person channel does.
2. Org unit code, state registry ID, and federal grant ID kept as **independent** domain
   properties (`stateRegistryId`, `federalGrantId`) on `OrganizationalUnit` — **W3C ORG** imposes
   no identifier scheme. ORG-ECON-01's missing federal grant ID is left absent, not inferred.
3. `hasCompetentAuthority` on both service records corrected from ORG-COMM-04 to ORG-ECON-01,
   matching the real **W3C ORG** `subOrganizationOf`/`hasSubOrganization` structure under
   Elmsworth County Government. The 2024 reorg itself is modeled as a real ORG `ChangeEvent` — a
   subclass of **W3C PROV-O's `Activity`** — with real `originalOrganization`/
   `resultingOrganization` properties. A general integrity check is recommended: flag any
   `PublicService` whose `hasCompetentAuthority` wasn't touched within a reasonable window of a
   relevant org-hierarchy change.
4. Residency modeled as a real **CPSV-AP** `Requirement`; the utility bill and lease agreement
   modeled as two real `Evidence` instances, both linked via the real `supportsRequirement`
   property. No invention needed — CPSV-AP's own split fixes this directly.
5. For `BusinessEvent`-triggered requirements, the triggering date is specified as the
   state-registration date, not the private sale date — closing an ambiguity that was never about
   modeling (`LifeEvent`/`BusinessEvent` are already distinct real classes), only about which date
   gets recorded.
6. "Department" split into two senses: HR's real **W3C ORG** `OrganizationalUnit`, and the
   website's domain `NavigationCategory`, explicitly linked many-to-many via `linkedToCategory`.
7. The linked `Rule` document's fee schedule got a domain `lastGenerated` date, flagged stale
   against the Board's 2025 fee increase — the fourth confirmed instance of the "canonical fact
   updates, public rendering doesn't" pattern (after manufacturing, media, and legal).
8. Finance's fee schedule treated as canonical for `Cost`; the catalog's $50 value is derived and
   flaggable against it, not a competing source of truth.
9. The annual review checkpoint gets a domain `reconcilesCompetentAuthorityAndCost: false` flag —
   it verifies reading, not reconciling. Same checkpoint-gap pattern found in every vertical.
10. Two domain `ProcessingTimeClaim` instances (published: 5 days; actual, renewal season: 11
    days) modeled side by side rather than reconciled into one figure — same operational
    disagreement shape as every prior vertical's SLA conflict.

## Requirements folded into existing conflicts

- **REQ-701** (rule document currency) — same underlying gap as Conflict 7; not resolved
  separately.
- **REQ-702** (cost matches fee schedule) — same underlying gap as Conflict 8; not resolved
  separately.

## Coverage — which conflicts have a worked instance in `ontology.ttl`

| Conflict | Worked instance in ontology.ttl? |
|---|---|
| 1 — channel variance | Yes — `Channel-InPerson` / `Channel-Online` |
| 2 — independent identifiers | Yes — `Org-Commerce` / `Org-EconDev` |
| 3 — competent authority + reorg | Yes — `Reorg2024`, `hasCompetentAuthority`, `subOrganizationOf` |
| 4 — requirement vs. evidence | Yes — `Req-Residency` + 2 `Evidence` instances |
| 5 — event-triggered date | Yes — `Req-30DayFiling` comment specifies the date rule |
| 6 — Department vs. NavigationCategory | Yes — `NavCategory-BusinessServices` |
| 7 — Rule document drift | Yes — `Rule-FeeSchedule` |
| 8 — Cost vs. fee schedule | Yes — `Cost-BusinessLicenseRenewal` |
| 9 — checkpoint gap | Yes — `ReviewCheckpoint-ConfirmDescriptionReviewed` |
| 10 — processing time claims | Yes — two `ProcessingTimeClaim` individuals |

All 10 conflicts have a worked Turtle instance — no gaps carried forward silently.

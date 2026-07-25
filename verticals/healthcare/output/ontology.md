# Millbrook Health — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[HL7 FHIR](https://www.hl7.org/fhir/) (chosen over SNOMED CT specifically because FHIR is fully
open). See `../stages/03-resolve.html` for the reasoning behind each choice, and `changelog.md`
for a flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `Patient` | **FHIR** | The subject of care. |
| `Encounter` | **FHIR** | An interaction between patient and provider — only visits that actually happened. |
| `Condition` | **FHIR** | Has independent `clinicalStatus` and `verificationStatus` fields. |
| `AllergyIntolerance` | **FHIR** | Has its own `criticality` field, independent of any `Condition`. |
| `FamilyPolicyGroup` | domain | Links dependents on a shared insurance policy — no FHIR element models this. |
| `ScheduledSlot` | domain | Front Desk's broader "encounter" meaning (including no-shows) — deliberately kept separate from FHIR's `Encounter`, which never covers no-shows. |
| `ReferralSLA` | domain | An operational turnaround claim — same honest fallback as every prior vertical's cross-team disagreement conflict. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `link` (type `replaces`/`replaced-by`) | **FHIR** | `Patient` → `Patient` | The real mechanism for duplicate/merged records (Conflict 1) |
| `clinicalStatus` / `verificationStatus` | **FHIR** | `Condition` | Both already real and distinct — the fix is a consumer rule, not new vocabulary (Conflict 3) |
| `criticality` | **FHIR** | `AllergyIntolerance` | |
| `codingLastSynced` | domain | `Condition` (date) | Flags a stale billing/clinical coding mapping (Conflict 4) |
| `memberOf` | domain | `Patient` → `FamilyPolicyGroup` | Makes shared member-ID prefixes queryable (Conflict 2) |
| `reconcilesMedicationList` | domain | care-plan checkpoint (boolean) | `false` where a checkpoint doesn't actually check this (Conflict 9) |
| `staleOpenEncounter` | domain | `Encounter` (boolean) | Flags an `in-progress` encounter with no recent activity (Conflict 7) |

## Worked instances

- **MRN-100234** (`Patient`) — `link` → MRN-100891, type `replaces`; `AllergyIntolerance` ALG-201 (Penicillin, criticality high)
- **MRN-100891** (`Patient`) — `link` → MRN-100234, type `replaced-by`
- **Elena Reyes / Tomas Reyes** — both `memberOf` the same `FamilyPolicyGroup`
- **COND-8802** — `clinicalStatus: active`, `verificationStatus: entered-in-error` — both asserted, neither hidden
- **COND-8801** — two codings on one `Condition.code`, `codingLastSynced: 2019` flagging staleness
- **ENC-5001** — flagged as a stale open encounter (status `in-progress`, no recent activity)
- **Two `ReferralSLA` instances** — Scheduling's (3 days) and Intake's (6 days), kept separate

## Known gaps

- **This Turtle file uses the real FHIR namespace (`http://hl7.org/fhir/`) but a simplified triple
  structure** — real FHIR RDF wraps every literal value in a `fhir:v` blank node (e.g.
  `fhir:status [ fhir:v "final" ]`) for reasons specific to FHIR's own tooling. This file uses
  plain literals instead, for readability. The vocabulary (class and property names) is real; the
  serialization style is simplified, and that's a deliberate, disclosed trade-off, not an
  inaccuracy about what FHIR actually models.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

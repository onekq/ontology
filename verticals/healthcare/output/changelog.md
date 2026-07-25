# Resolution Changelog — Millbrook Health

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | No new triples — resolved via Conflict 1's `link` |
| 6 | 6 | No instance needed — resolved by citing two existing real fields |
| 7 | 7 | Yes |
| 8 | 8 | No instance — a per-use consumer rule, not a static fact to assert |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **MRN-100234/MRN-100891 duplicate** resolved with **FHIR's own `Patient.link`** (`replaces`/`replaced-by`) — the real mechanism built for exactly this. MRN-100234 (clinically complete) is asserted as the surviving record.
2. **Family-plan member ID mixup** resolved with a domain `FamilyPolicyGroup` linking Elena and Tomas Reyes — no FHIR element models shared-policy grouping, checked first before inventing.
3. **Entered-in-error condition counted as active** resolved by a consumer rule, not new vocabulary: check **FHIR's `verificationStatus`** before trusting **`clinicalStatus`** — both fields already existed; the gap was in how a downstream system used them, not in the ontology.
4. **Dual coding drift** resolved by keeping both codings on one `Condition.code` (**FHIR's `CodeableConcept`** already supports this) plus a domain `codingLastSynced` flag for staleness.
5. **Lost allergy visibility** required no new work — Conflict 1's `link` resolution fixes it automatically, the same way manufacturing's and retail's dependent conflicts resolved for free once their parent conflict was fixed correctly.
6. **"Active"** required no new work — Nursing's meaning (**`Encounter.status`**) and Billing's (**`Condition.clinicalStatus`**) were already distinct real FHIR fields.
7. **Stale open encounter + Front Desk's "encounter"** resolved with a domain `staleOpenEncounter` flag on `Encounter-5001`, and a separate domain `ScheduledSlot` class for Front Desk's broader meaning — **FHIR's `Encounter`** was never meant to include no-shows.
8. **Consent purpose mismatch** resolved as a re-verify-per-use rule against **FHIR's `Consent`** resource's actual recorded scope — not asserted as a static ontology fact, since the check has to happen at the moment of use.
9. **Care plan checkpoint gap** flagged with a domain `reconcilesMedicationList: false` property — same cross-domain checkpoint-gap pattern as manufacturing, retail, and financial services.
10. **Referral SLA disagreement** kept as two domain `ReferralSLA` instances rather than reconciled — same principle as every prior vertical's operational-disagreement conflict.

**Three items were explicitly logged as not resolved separately**, not silently dropped: REQ-303 (folded into #1 — the unactioned duplicate flag and the unmerged records are the same failure), the Reyes mixup (folded into #2), and ALG-201's visibility (folded into #1, same reasoning as #5). See Stage 4 (Validate) for the full trace.

# Healthcare — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to healthcare ontologies.

**If the user has their own real source material** (patient registries, encounter/condition records, allergy/medication logs, consent/compliance registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real ontologies, not invented vocabulary

For healthcare specifically, check **[HL7 FHIR](https://www.hl7.org/fhir/)** before inventing anything: `Patient` (with `link` for duplicate/merged records — `replaces`/`replaced-by`/`refer`/`seealso`), `Encounter`, `Condition` (with independent `clinicalStatus` and `verificationStatus` fields, including a real `entered-in-error` state), `AllergyIntolerance` (with its own `criticality` field), `Consent`.

**Prefer FHIR over SNOMED CT for open research.** SNOMED CT is license-restricted in many jurisdictions, which makes the "fetch the real spec and verify real class names" step harder to do openly — the same research pattern that worked cleanly for IOF Core, GoodRelations, and FIBO doesn't work as well against a licensed terminology. FHIR is fully open and covers the structural/administrative layer this method mostly needs; only reach for a licensed terminology's actual codes if the user's own real data requires it.

## What to expect in this domain

1. **Duplicate patient records are common and FHIR has a real mechanism for them.** Registration errors, name variants, and multiple points of entry (ER vs. primary care) routinely create two records for one person. Use `Patient.link` (`replaces`/`replaced-by`) rather than inventing a merge concept — and resolve which record is authoritative *before* other conflicts that depend on it (a lost allergy, a family member-ID mixup often turn out to be downstream of this one).

2. **`clinicalStatus` and `verificationStatus` are separate fields for a reason.** A condition can be `active` and simultaneously `entered-in-error` — a downstream system reading only one is a real, common integration bug, not an ontology gap. The fix is usually a consumer rule (check both), not new vocabulary.

3. **The same condition can carry two codes that have quietly drifted apart** — a billing code (e.g. ICD-10) and a clinical terminology code, updated on different schedules by different teams. `CodeableConcept` already supports multiple codings on one concept; flag staleness explicitly rather than trusting an old mapping as current.

4. **A named checkpoint can promise more than it checks** — "confirm patient contacted" is not the same as "reconcile the medication list," even under the same care-plan-review umbrella. Same cross-domain pattern as every prior vertical's checkpoint-gap conflict.

5. **Consent scope and purpose-of-use are not the same fact as "a consent exists."** Sharing data under a consent scoped for one purpose (e.g. billing) for a different purpose (e.g. care coordination) is a real, common compliance gap — model it as a per-use check against the consent's actual recorded scope, not a static yes/no.

6. **Operational claims (referral turnaround, scheduling SLAs) come from teams that don't reconcile with each other**, same shape as every prior vertical's cycle-time/SLA conflict.

## Suggested output

A class hierarchy plus relation set, reusing FHIR wherever it fits, and domain-specific vocabulary only after checking FHIR first and saying so explicitly. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working, rdflib-validated example (note its disclosed simplification versus real FHIR RDF's `fhir:v`-wrapped literal style) — or plain markdown tables if not.

## Demo walkthrough

See `stages/` for a worked example against the fictional provider "Millbrook Health" (`materials/`) — a community health system whose patient registry, encounter/condition records, allergy/medication log, clinical/billing glossary, consent/compliance requirements, and care-coordination process notes all disagree with each other on purpose, centered on a realistic duplicate-patient-record patient-safety gap.

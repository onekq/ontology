# Financial Services — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to financial-services ontologies.

**If the user has their own real source material** (customer/party registries, beneficial ownership files, legal entity registration records, KYC/compliance policy registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real ontologies, not invented vocabulary

For financial services specifically, check these before inventing anything:

- **[FIBO](https://github.com/edmcouncil/fibo)** (Financial Industry Business Ontology, EDM Council — the same body behind IOF) — `LegalEntity`/`LegalPerson`, `LegalEntityIdentifier` (ISO 17442, the real LEI standard), `EntityLegalForm` (ISO 20275), `isDirectlyConsolidatedBy`/`isUltimatelyConsolidatedBy`, `hasOwnershipPercentage`, `SpecialPurposeVehicle`.
- **W3C PROV-O** — for audit trail (`wasAssociatedWith`, `endedAtTime` on an `Activity`) and revision history (`wasRevisionOf`). More central here than in prior verticals — provenance is close to the actual job, not a bolt-on.

**Watch for name collisions across real ontologies, not just against invented vocabulary.** FIBO has its own `BusinessEntity` class, unrelated to GoodRelations' `gr:BusinessEntity` (used in the retail vertical for sellers). Same name, two real but unrelated ontologies. "It's from a real ontology" isn't sufficient disambiguation by itself — confirm *which* real ontology a term is claimed from.

## What to expect in this domain

1. **"Direct" and "ultimate" ownership are not the same fact, and conflating them is a real, common KYC/AML failure mode.** A borrower's KYC file often stops at the first corporate owner encountered (a fund, a holding company, a special-purpose vehicle) without tracing further to the natural persons who actually control it — even when the regulatory threshold (commonly 25% effective ownership) is clearly met once you look past the first layer. Model `isDirectlyConsolidatedBy` and `isUltimatelyConsolidatedBy` as genuinely distinct facts, and don't fabricate the latter when it's unknown — an explicit gap is more useful than a false confidence.

2. **Not every legal entity needs every identifier.** LEIs aren't universally required (only for certain regulated transactions); individuals never have one. Leave genuinely absent identifiers absent.

3. **A single mutable field (jurisdiction, legal form) hides real history.** Entities re-domesticate, restructure, and change form; if the source system only ever shows "current" values, you're looking at whichever value was true when someone last touched the record, not necessarily today's.

4. **A checkpoint's name can promise more than it checks.** "Confirm still operating" is not the same as "re-verify beneficial ownership," even when both live under the same annual review process.

5. **Approval/audit trails recorded as free text aren't actually audit trails.** If "who approved this and when" lives in a notes field by convention rather than structured fields, model what it *should* be (a `prov:Activity` with a real agent and timestamp), and flag the gap between that and what actually exists.

6. **Risk assessments from different teams don't automatically reconcile.** A stale "Low" rating and an unreviewed elevated-activity flag can coexist indefinitely if nothing forces the two processes to talk to each other.

## Suggested output

A class hierarchy plus relation set, reusing FIBO wherever it fits, PROV-O for anything provenance/temporal, and domain-specific vocabulary only after checking both real ontologies first and saying so explicitly. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working, rdflib-validated example — or plain markdown tables if not.

## Demo walkthrough

See `stages/` for a worked example against the fictional lender "Kestrel Bank" (`materials/`) — a community bank whose customer registry, beneficial ownership file, entity/rate change log, risk & compliance glossary, KYC requirements register, and refresh/audit process notes all disagree with each other on purpose, centered on a realistic direct-vs-ultimate beneficial ownership gap.

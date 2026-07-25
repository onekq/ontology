# Insurance — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to insurance ontologies.

**If the user has their own real source material** (plan registries, formulary/cost-sharing records, network/provider status records, regulatory filing registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real vocabulary, not invented terms

For insurance, check **[schema.org's health-insurance vocabulary](https://schema.org/HealthInsurancePlan)** before inventing anything: `HealthInsurancePlan` (with a real `healthPlanId` — the 14-character, HIOS-generated federal Plan ID), `HealthPlanNetwork`, `HealthPlanFormulary`, `HealthPlanCostSharingSpecification` (`healthPlanCoinsuranceOption`, `healthPlanCopay`), `benefitsSummaryUrl`/`healthPlanMarketingUrl`.

**This vocabulary exists because of a real 2015 CMS regulatory mandate** requiring insurers to publish machine-readable plan/network data — worth knowing, since it explains both why the vocabulary exists and why it's scoped to US health insurance specifically, not insurance generally.

**Two real options were checked and passed over for this vertical, and it's worth knowing why:**
- **ACORD** — the dominant real insurance data-exchange standard, but its specifications are largely membership-gated XML message schemas, not openly published RDF/OWL. If your real source material is ACORD-based, you'll need direct access to those specs; this recipe's schema.org grounding won't cover ACORD-specific message formats.
- **insuranceontology.com** — a real, independently maintained project, but thin and explicitly "still in development." Not comparable in maturity to IOF Core, GoodRelations, FIBO, FHIR, ODRL, or Akoma Ntoso.

**This means schema.org's coverage here is narrower than other verticals' groundings** — health insurance plan/network/formulary data specifically, not general property & casualty, life, or commercial insurance. Say so if you extend this pattern to those lines; don't stretch schema.org's real terms to cover what they don't.

## What to expect in this domain

1. **A "plan" reference can mean a base plan or one specific cost-sharing variation of it**, especially when multiple variations share one regulatory filing. Resolve this ambiguity before other conflicts that depend on it.

2. **Federal (HIOS), internal, and state (SERFF) identifiers don't always coexist**, and that's expected — schema.org's own `usesHealthPlanIdStandard` property implies HIOS is preferred, not exclusive.

3. **A plan's official formulary tier and a Pharmacy Benefit Manager's actual billing tier can drift apart** after a supplier contract change nobody propagated back to the plan's own record. This has real financial stakes for members — don't silently trust either system as correct; flag the mismatch.

4. **Cost-sharing timing (before/after deductible) can be misconfigured in claims systems independent of what the filed plan spec actually says.** Trust the filed spec; flag the system as wrong, not as an alternate interpretation.

5. **Network membership status can lag real contract terminations.** Model an explicit effective-through date and flag claims processed after it, rather than treating network status as a single static field.

6. **"Filed" and "Approved" are not the same regulatory state**, and conflating them (treating a submitted-but-unapproved filing as if it authorizes billing) is a real compliance risk.

7. **Public-facing documents (brochures, summaries) drift from the canonical current terms** — the same pattern shows up in the legal vertical's Manifestation-drift conflict; it's a genuinely cross-domain failure mode, not specific to either domain.

8. **A checkpoint's name can promise more than it checks** — same cross-domain pattern as every prior vertical.

## Suggested output

A class hierarchy plus relation set, reusing schema.org wherever it fits, and domain-specific vocabulary only after checking schema.org (and, if relevant, ACORD/insuranceontology.com) first. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working, rdflib-validated example.

## Demo walkthrough

See `stages/` for a worked example against the fictional insurer "Thistlebrook Health Plans" (`materials/`) — a health insurer whose plan registry, formulary/cost-sharing records, network/provider status records, sales/compliance glossary, regulatory filing requirements, and renewal/customer-service process notes all disagree with each other on purpose, centered on a realistic formulary-tier billing discrepancy.

# Thistlebrook Health Plans — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[schema.org's health-insurance vocabulary](https://schema.org/HealthInsurancePlan) — created in
response to a real 2015 CMS regulatory requirement for machine-readable health plan data. See
`../stages/03-resolve.html` for the reasoning behind each choice, and `changelog.md` for a flat
list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## Why schema.org, not ACORD

ACORD is the dominant real insurance data-exchange standard, but its specs are largely
membership-gated XML message schemas, not openly published RDF/OWL. A separate check of
`insuranceontology.com` found it real but thin and still in development. schema.org's CMS-driven
health-plan vocabulary was the strongest openly-verifiable option — narrower in scope (health
insurance specifically, not general P&C/life) but genuinely real and well-documented.

## Classes

| Class | Source | Definition |
|---|---|---|
| `HealthInsurancePlan` | **schema.org** | A specific health insurance product, identified by a real 14-character HIOS Plan ID. |
| `HealthPlanNetwork` | **schema.org** | "A US-style health insurance plan network." |
| `HealthPlanFormulary` | **schema.org** | Drug cost/coverage specification for a plan. |
| `HealthPlanCostSharingSpecification` | **schema.org** | Cost-sharing terms including coinsurance timing. |
| `PlanFamily` | domain | Groups plan variations sharing one SERFF filing — schema.org has no "variation of" relation. |
| `QuotableOffering` | domain | Sales' looser "Plan" meaning, promoted to `HealthInsurancePlan` on approval. |
| `SERFFFilingStatus` | domain | Filed/Approved/Rejected — neither ACORD's gated specs nor schema.org cover regulatory workflow. |
| `ServiceLevelClaim` | domain | An operational turnaround/hold-time claim. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `usesHealthPlanIdStandard` | **schema.org** | `HealthInsurancePlan` | Implies HIOS isn't the only possible standard — supports keeping identifiers independent (Conflict 2) |
| `includesHealthPlanFormulary` / `includesHealthPlanNetwork` | **schema.org** | `HealthInsurancePlan` | |
| `healthPlanDrugTier` | **schema.org** | `HealthPlanFormulary` | Thistlebrook's official value (Conflict 3) |
| `healthPlanCoinsuranceOption` | **schema.org** | `HealthPlanCostSharingSpecification` | "before or after deductible" (Conflict 4) |
| `benefitsSummaryUrl` / `healthPlanMarketingUrl` | **schema.org** | `HealthInsurancePlan` | Can drift stale (Conflict 7) |
| `tierMismatch` | domain | `PBMTierRecord` (boolean) | (Conflict 3) |
| `claimsConfigMismatch` | domain | claims config (boolean) | (Conflict 4) |
| `effectiveThrough` / `processedAgainstStaleNetworkStatus` | domain | `HealthPlanNetwork` membership | (Conflict 5) |
| `lastGenerated` | domain | linked document (date) | (Conflict 7) |
| `reconcilesFormularyTiers` | domain | renewal checkpoint (boolean) | (Conflict 9) |
| `memberOfFamily` | domain | `HealthInsurancePlan` → `PlanFamily` | Links a plan variation to its family (Conflict 1) |
| `filingStatus` | domain | `QuotableOffering` → `SERFFFilingStatus` | (Conflict 8) |

## Worked instances

- **89432CA0010001 / 89432CA0010002** — two `HealthInsurancePlan`s, same `PlanFamily`
- **89432CA0030001** (Bronze PPO) — `SERFFFilingStatus: none filed`, modeled as a `QuotableOffering` only, not yet a `HealthInsurancePlan`
- **Atorvastatin `healthPlanDrugTier: 2`** — paired `PBMTierRecord` with `tier: 3`, `tierMismatch: true`
- **Outpatient PT cost-sharing** — `healthPlanCoinsuranceOption: after deductible`; claims config flagged `claimsConfigMismatch: true`
- **Dr. Vasquez's `HealthPlanNetwork` membership** — `effectiveThrough: 2025-04-01`; later claims flagged `processedAgainstStaleNetworkStatus: true`
- **Thistlebrook Gold PPO's marketing document** — `lastGenerated: 2023`, stale against the 2024 rate change
- **Renewal checkpoint** — `reconcilesFormularyTiers: false`
- **Two `ServiceLevelClaim`s** — published (5 min, year-round) and actual (12 min, open enrollment)

## Known gaps

- **This vertical covers health insurance specifically** — schema.org's real vocabulary doesn't extend to general property & casualty, life, or commercial lines insurance. A vertical for those would need to ground in ACORD directly (with its access constraints) or another source not yet identified.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

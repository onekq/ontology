# Resolution Changelog — Thistlebrook Health Plans

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published vocabulary, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | Yes |
| 6 | 6 | No instance needed — resolved by the pattern from Conflict 1's PlanFamily/QuotableOffering split |
| 7 | 7 | Yes |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **Plan vs. plan-variation** resolved by keeping two real **`HealthInsurancePlan`** instances, linked by a domain `PlanFamily` — schema.org has no "variation of" relation, checked first.
2. **HIOS/internal/SERFF identifier independence** kept as three separate identifiers — **schema.org's own `usesHealthPlanIdStandard`** property implies HIOS isn't the only possible standard.
3. **Formulary tier mismatch** resolved by keeping **`healthPlanDrugTier`** (Thistlebrook's official value) alongside a domain `PBMTierRecord` (Meridian Rx's actual billing value), flagged `tierMismatch: true` — neither silently overrides the other.
4. **Coinsurance timing conflation** resolved by asserting **`healthPlanCoinsuranceOption: after deductible`** per the real filed spec, with the claims system's conflicting default flagged as a domain `claimsConfigMismatch: true`.
5. **Network membership drift** resolved with a domain `effectiveThrough` date matching the real contract end, and `processedAgainstStaleNetworkStatus: true` on affected claims.
6. **"Plan" ambiguity** resolved with a domain `QuotableOffering` (Sales' meaning) promoted to real **`HealthInsurancePlan`** (Compliance's meaning) only on SERFF approval — same "loose commercial term vs. strict legal term" pattern as Offer/Agreement (media) and Party/LegalPerson (finance).
7. **Stale marketing documents** flagged with a domain `lastGenerated` date — the same "public rendering drifts from canonical source" pattern as the legal vertical's Manifestation conflict, now confirmed recurring across at least two unrelated domains.
8. **Filed vs. Approved status** resolved with a domain `SERFFFilingStatus` — neither ACORD's gated specs nor schema.org model regulatory filing workflow; invented deliberately after checking both.
9. **Renewal checkpoint gap** flagged with a domain `reconcilesFormularyTiers: false` — same cross-domain checkpoint pattern as every prior vertical.
10. **Call center SLA disagreement** kept as two domain `ServiceLevelClaim` instances rather than reconciled.

**Two items were explicitly logged as not resolved separately**: REQ-603 (folded into #7) and REQ-602 (folded into #9). See Stage 4 (Validate) for the full trace.

## A note on scope

This vertical covers health insurance specifically, because schema.org's real vocabulary doesn't
extend further. General P&C, life, or commercial insurance would need ACORD directly — which
comes with the access constraints noted in Draft — or a source not yet identified. Said plainly
rather than stretched to look more general than it is.

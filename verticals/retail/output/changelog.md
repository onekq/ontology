# Resolution Changelog — Alderleaf

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | Yes |
| 6 | 6 | No instance needed — resolved by citing two existing real classes, not by adding one |
| 7 | 7 | Yes |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **SKU ambiguity** resolved by splitting **schema.org's `sku`** (kept on `Product`) from a new `seller_sku` (on `Offering`) — schema.org's own definition covers both meanings without distinguishing them; this ontology is more precise than the standard it's built on.
2. **ALD-BP-CASCADE-60-SG's silent redesign** modeled as two `Product` instances sharing one GTIN, linked by **PROV-O's `wasRevisionOf`** — with the GTIN reuse itself flagged as a violation of GS1's own guidance, not silently accepted.
3. **OutdoorLiquidators' self-contradicting offer** resolved with `schema:OfferItemCondition = RefurbishedCondition` plus a domain `descriptionContradictsCondition` flag — deliberately *not* `skos:closeMatch`, since this is a self-consistency problem within one seller's data, not a cross-source entity-matching problem like manufacturing's vendor cross-references. Forcing the SKOS pattern here just to reuse it would have been the wrong fit.
4. **SKU/GTIN/MPN independence** kept as three separate **schema.org** properties, none implying the others; the Trailmix Cook Pot's missing MPN left absent with `identifierCompleteness: partial` rather than inferred.
5. **Category crosswalk** kept as two linked category instances (`priorCategoryOf`, domain-specific) rather than collapsing to the current tree — unmigrated BI dashboards still depend on the legacy one existing.
6. **"Listing"** resolved without inventing anything: Marketing's meaning is **schema.org's `AggregateOffer`**, Marketplace Ops' is **GoodRelations' `Offering`** — both already real, standard classes. Different outcome than manufacturing's "Assembly" conflict, which needed a new domain class on one side.
7. **PROMO-114/121 overlap** modeled as two separate **GoodRelations `UnitPriceSpecification`** instances with their own `validFrom`/`validThrough` — the overlap is left queryable, not resolved; which promotion wins at checkout is a business stacking rule, out of ontology scope.
8. **REQ-101 (hazmat)** modeled with a domain `PolicyRequirement` and `policySatisfiedBy` — checked GoodRelations and schema.org first, neither models compliance policy; invented deliberately, same discipline as manufacturing's `alternativeTo`. Treated as needing re-verification on recategorization, not a static pointer — this is the conflict with real shipping-compliance stakes.
9. **Returns inspection checkpoint** modeled as a real **schema.org `ReturnAction`** rather than a bespoke process class, with a domain `verifiesAgainstOriginalOrder: false` flag for the specific gap neither real vocabulary covers at that granularity.
10. **Fulfillment SLA disagreement** kept as two domain `DeliveryEstimate` instances (Marketing's, Warehouse Ops') rather than reconciled into one number — the disagreement between the two teams is the fact worth preserving.

**Two items were explicitly logged as not resolved separately**, not silently dropped: REQ-102 (folded into #3 — same "condition field vs. reality" defect) and REQ-103 (folded into #2 — same "catalog spec vs. actual current product" defect). See Stage 4 (Validate) for the full trace.

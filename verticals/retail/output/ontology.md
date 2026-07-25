# Alderleaf — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[GoodRelations](http://www.heppnetz.de/projects/goodrelations/primer/) and
[schema.org](https://schema.org/Product)'s commerce vocabulary, plus W3C PROV-O and W3C SKOS
where domain-neutral. See `../stages/03-resolve.html` for the reasoning behind each choice, and
`changelog.md` for a flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `Product` / `ProductGroup` | **schema.org** | The abstract item and its variant-bearing group. |
| `Offering` | **GoodRelations** | A seller's public announcement to provide a product — one per seller per product. |
| `BusinessEntity` | **GoodRelations** | The seller making an `Offering`. |
| `AggregateOffer` | **schema.org** | Rolls up multiple `Offering`s into a price range for the storefront page. |
| `UnitPriceSpecification` | **GoodRelations** | A price with `validFrom`/`validThrough`. |
| `OfferItemCondition` | **schema.org** | Enumeration: `NewCondition`, `RefurbishedCondition`, `UsedCondition`. |
| `PolicyRequirement` | domain | A compliance rule (e.g. hazmat shipping notice) — neither GoodRelations nor schema.org models this; checked both before inventing. |
| `DeliveryEstimate` | domain | A cycle-time/SLA claim — same reasoning as `PolicyRequirement`. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `sku` | **schema.org** | `Product` | Alderleaf's own catalog identifier — kept separate from `seller_sku` (Conflict 1) |
| `seller_sku` | domain | `Offering` | Per-seller identifier, distinct from `Product.sku` |
| `gtin13` / `mpn` | **schema.org** | `Product` | Independent of each other and of `sku` — not all three required (Conflict 4) |
| `isVariantOf` | **schema.org** | `Product` → `ProductGroup` | |
| `gr:offers` | **GoodRelations** | `BusinessEntity` → `Offering` | |
| `gr:includesObject` | **GoodRelations** | `Offering` → `Product` | |
| `validFrom` / `validThrough` | **GoodRelations** | `UnitPriceSpecification` | Overlap left queryable, not resolved (Conflict 7) |
| `wasRevisionOf` | **W3C PROV-O** | `Product` → `Product` | Redesigned product → original, same GTIN (Conflict 2) |
| `descriptionContradictsCondition` | domain | `Offering` (boolean) | Not a SKOS match — a self-consistency flag, different conflict shape (Conflict 3) |
| `identifierCompleteness` | domain | `Product` | `partial` where an identifier is genuinely absent, not inferred (Conflict 4) |
| `priorCategoryOf` | domain | category → category | Legacy tree kept queryable, not deleted (Conflict 5) |
| `policySatisfiedBy` | domain | `PolicyRequirement` → category | Re-verify-on-recategorization, not static (Conflict 8) |
| `verifiesAgainstOriginalOrder` | domain | return process step (boolean) | `false` where a checkpoint doesn't actually check identity (Conflict 9) |

## Worked instances

- **Cascade Trail Backpack** (`ProductGroup`) — three `Product` variants `isVariantOf` it: 45L Slate Grey, 45L Moss Green, 60L Slate Grey
- **ALD-BP-CASCADE-60-SG** — original `Product` (60L, MPN CT60-SG) and redesigned `Product` (55L, MPN CT55-SG) share one GTIN, linked by `wasRevisionOf`; the shared GTIN itself flagged against GS1 guidance
- **GTIN 00612345678905** — three `Offering`s (`BusinessEntity`: Alderleaf Direct, TrailGearCo, OutdoorLiquidators), rolled up into one `AggregateOffer`; OutdoorLiquidators' carries `descriptionContradictsCondition: true`
- **PROMO-114 / PROMO-121** — two `UnitPriceSpecification`s with overlapping `validFrom`/`validThrough` on the same variant, kept distinct
- **REQ-101** (`PolicyRequirement`) — `policySatisfiedBy` → `Electronics > Batteries` category flag; Cascade Headlamp's actual category (`Outdoor Gear > Lighting`) doesn't carry it — violation surfaced, not hidden
- **Returns `ReturnAction`** — inspection step carries `verifiesAgainstOriginalOrder: false`
- **Two `DeliveryEstimate`s** — Marketing's (1 day) and Warehouse Ops' (1.5 days), kept as separate instances

## Known gaps

- **`priorCategoryOf` has only one fully worked pair** (Cascade Trail Backpack's legacy/current category link) in `ontology.ttl` — the Trailmix Cook Pot's crosswalk is documented in the materials and changelog but not separately instantiated, to keep the Turtle file focused rather than mechanically duplicating the same pattern.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

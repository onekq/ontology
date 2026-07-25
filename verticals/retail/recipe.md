# Retail / E-commerce — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to retail/e-commerce ontologies.

**If the user has their own real source material** (product catalogs, marketplace feeds, promotions logs, category taxonomies, requirements/policy registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real ontologies, not invented vocabulary

For retail specifically, check these before inventing anything:

- **[GoodRelations](http://www.heppnetz.de/projects/goodrelations/primer/)** (Hepp) — `Offering`, `BusinessEntity`, `UnitPriceSpecification` with `validFrom`/`validThrough`, `BusinessFunction` (`Sell`/`Repair`/`Lease`/`Dispose`).
- **[schema.org](https://schema.org/Product)'s commerce vocabulary** — `Product`/`ProductGroup`/`isVariantOf`, `sku`/`gtin8-14`/`mpn`, `Offer`/`AggregateOffer`, `OfferItemCondition` (`NewCondition`/`RefurbishedCondition`/`UsedCondition`), `ReturnAction`.
- **W3C SKOS** — for genuine cross-source entity-matching confidence (`exactMatch`/`closeMatch`), *not* for internal self-consistency problems within one source — those are a different conflict shape (see Resolve Conflict 3).
- **W3C PROV-O** — for revision/derivation history (`wasRevisionOf`), same as manufacturing.

**Don't reuse manufacturing's IOF Core pattern by default.** IOF Core reifies identifiers as their own entities (a BFO-derived pattern specific to that ontology's tradition). GoodRelations and schema.org don't do this — `sku`/`gtin`/`mpn` are plain properties. Use whichever real ontology's actual pattern fits the domain at hand, not whichever pattern worked in the last vertical.

## What to expect in this domain

1. **SKU is ambiguous by design in the underlying standard.** schema.org's own definition of `sku` covers both "the product's identifier" and "the identifier the offer refers to" without distinguishing them. Split it explicitly — `Product.sku` vs. a per-`Offering` seller identifier — before anything else, since most other conflicts depend on this distinction already being made.

2. **The same GTIN can quietly denote a materially different product.** GS1 guidance says a new GTIN should be issued for a material change; small/medium manufacturers often skip this. Check for it explicitly rather than trusting GTIN as a stable identity.

3. **Multi-seller offers can be self-contradicting, not just mutually inconsistent.** A single seller's own `item_condition` field and free-text description can disagree with each other. This is a different conflict shape than cross-seller entity-matching (SKOS territory) — don't force the SKOS pattern onto a self-consistency problem.

4. **Category taxonomies fragment after catalog mergers.** Don't collapse a legacy tree into the new one if anything (dashboards, reports) still depends on the legacy tree existing — keep both, linked.

5. **Promotional price windows overlap without a stated stacking rule.** The ontology's job is to make the overlap queryable, not to silently pick a winner — that's a checkout business-logic decision, out of scope.

6. **Compliance/policy requirements aren't modeled by either real vocabulary here.** Neither GoodRelations nor schema.org has a first-class "compliance rule" concept — this is a legitimate place to invent domain-specific vocabulary, same discipline as manufacturing's `alternativeTo`.

7. **Operational claims (fulfillment SLAs, cycle times) come from teams that don't reconcile with each other**, same shape as manufacturing's cycle-time conflict — model both, don't average.

## Suggested output

A class hierarchy plus relation set, reusing GoodRelations/schema.org wherever they fit, W3C SKOS/PROV-O where domain-neutral, and domain-specific vocabulary only after checking real options first and saying so explicitly. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working, rdflib-validated example — or plain markdown tables if not. Include the Validate-stage changelog so conflicts are auditable without re-reading every source doc.

## Demo walkthrough

See `stages/` for a worked example against the fictional retailer "Alderleaf" (`materials/`) — a home & outdoor goods e-commerce marketplace whose product catalog, marketplace offers feed, promotions log, category taxonomy, storefront requirements, and returns/fulfillment process all disagree with each other on purpose.

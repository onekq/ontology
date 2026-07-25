# Media / Real Estate — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to media/rights ontologies.

**If the user has their own real source material** (asset registries, licensing agreement logs, rights/legal glossaries, compliance registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real ontologies, not invented vocabulary

For media/rights specifically, check **[ODRL](https://www.w3.org/TR/odrl-model/)** (Open Digital Rights Language, W3C Recommendation) before inventing anything: `Policy` (with real subtypes `Set`/`Offer`/`Agreement`), `Permission`/`Prohibition`/`Duty`, `Asset`, `Party`, real actions (`use`, `reproduce`, `distribute`, `sell`, `give`, `license`, `attribute`, ...), and the real `constraint` structure (`leftOperand`/`operator`/`rightOperand`, with real operands like `spatial`, `timeInterval`, `purpose`, `percentage`, `payAmount`).

**This is a genuinely different reasoning shape than the other four verticals.** IOF Core, GoodRelations, FIBO, and FHIR are all descriptive — what exists, how it relates. ODRL is deontic — what's permitted, prohibited, or owed. A `Permission` and a `Prohibition` can legitimately coexist on the same asset; the ontology's job is to represent that, not silently pick a winner.

**Model constraints as real `odrl:constraint` structures, not bare properties.** It's tempting to write something like `odrl:percentage "15"` directly on a `Duty` — but `percentage`, `payAmount`, `spatial`, and `timeInterval` are Constraint *left-operands*, meant to live inside an `odrl:constraint` blank node with `leftOperand`/`operator`/`rightOperand`. Getting this wrong is an easy, specific mistake — it happened once during this vertical's own build and was caught by cross-checking the output against the real spec.

**Don't invent an action ODRL doesn't have.** There's no dedicated `lease` or `rent` action in ODRL's real vocabulary — model temporary physical-space use as `odrl:use` constrained by `spatial`/`timeInterval`, not a fabricated action.

## What to expect in this domain

1. **"License" is used loosely by sales/commercial teams and strictly by legal teams.** Map the loose meaning to `Offer` and the strict meaning to `Agreement` — both are real ODRL subtypes, no new vocabulary needed.

2. **A new Permission can be granted without checking older, still-active Prohibitions on the same asset.** This is a genuine, common rights-management failure mode — not a hypothetical. Assert both; flag the overlap; don't auto-resolve which wins.

3. **"Sold" and "licensed" get used interchangeably by non-legal staff, but ODRL's own actions distinguish them precisely** — `sell`/`give` transfer and delete the original; `use`/`license` don't. Trust the signed action, not the casual internal label, and flag when they disagree.

4. **Not every cross-system disagreement should be resolved the same way.** Some (like two departments' operational SLAs) genuinely have no canonical source — keep both. Others (like a license's own recorded terms vs. a downstream system's stale copy) do have one — model the copy as derived and flag staleness, don't treat it as equally authoritative.

5. **Obligations (Duties) are easy to record and easy to forget to verify.** An attribution or royalty Duty existing in a contract is not the same fact as it being fulfilled or paid correctly — flag fulfillment/reconciliation gaps explicitly, same cross-domain checkpoint pattern as every other vertical.

## Suggested output

A class hierarchy plus relation set, reusing ODRL wherever it fits — including its real `Constraint` structure, not a flattened substitute — and domain-specific vocabulary only after checking ODRL first. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working, rdflib-validated example — or plain markdown tables if not.

## Demo walkthrough

See `stages/` for a worked example against the fictional agency "Amberlane Media" (`materials/`) — a stock photo/footage licensing agency whose asset registry, licensing agreements, constraint-drift records, rights/legal glossary, attribution/compliance requirements, and studio-booking/royalty process notes all disagree with each other on purpose, centered on a realistic Permission-granted-over-an-active-Prohibition rights conflict.

# Manufacturing / Supply Chain — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/unfold.md` first for the general method, then come back here for what's specific to manufacturing/supply-chain ontologies.

**If the user has their own real source material** (BOMs, supplier catalogs, engineering change logs, requirements registers), run the Unfold method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover.

## Ground classes and relations in real ontologies, not invented vocabulary

Don't invent relation names from scratch — check whether a real, published ontology already
covers the concept first. For manufacturing specifically:

- **[IOF Core](https://github.com/iofoundry/ontology)** (Industrial Ontologies Foundry, built on BFO) — the primary source for structural classes and relations: `Assembly`, `MaterialComponent`, `MaterialProduct`, `Manufacturer`/`Supplier` roles, `Identifier`/`denotes`, `hasComponentPartAtSomeTime`/`AtAllTimes`, `RequirementSpecification`/`DesignSpecification`/`requirementSatisfiedBy`.
- **W3C PROV-O** — for revision/derivation history: `wasRevisionOf`, `wasDerivedFrom`.
- **W3C SKOS** — for cross-reference confidence levels: `exactMatch`, `closeMatch`, `broadMatch`. A disproven cross-reference gets *no* match property — don't default to `closeMatch` just because a source document called two things "equivalent."
- **QUDT** — for any quantity that source material states in inconsistent units (mm vs. inches, etc.). Model as a real `qudt:QuantityValue` so unit mismatches become computable facts, not prose asides.

Only invent a domain-specific relation when you've actually checked these four and none fit — and say so explicitly when you do, the way `alternativeTo` is flagged in this vertical's output.

## What to expect in this domain

1. **Part-of vs. variant-of vs. sibling-of.** A BOM's parent/child structure conflicts with how a "kit" or repair/service variant actually relates to the base product. Don't assume the BOM's literal tree is the correct ontology — it's evidence, not the answer.

2. **The same part number denoting physically different things over time.** Treat part numbers as `Identifier`s that `denote` something, not as the thing itself — a running change without a new part number issued is common, and it's exactly what `Identifier` + `wasRevisionOf` is for.

3. **Vendor vs. manufacturer conflation.** ERPs often have a single "Vendor" field. For resold parts, the actual manufacturer is frequently just unrecorded — model that as an explicitly unfilled `ManufacturerRole`, not a silent assumption that vendor equals manufacturer.

4. **Revision drift that isn't linear.** Engineering assumes a later revision supersedes an earlier one. Reality is often that both ship concurrently in different contexts. Check for effectivity dates (and whether they're actually populated) before modeling revisions as a simple chain — prefer `hasComponentPartAtSomeTime` over `AtAllTimes` wherever that's true.

5. **Department-local vocabulary collisions.** The same word means structurally different things to engineering, procurement, and QA. Check whether a real ontology's definition already resolves which department's meaning it actually matches — it's often not a clean 50/50 split.

6. **Stale requirement-satisfaction links.** A `requirementSatisfiedBy` pointer set once at requirement creation doesn't get revisited when the linked design changes. This is the conflict shape most likely to have real compliance stakes, not just modeling tidiness — treat it accordingly.

## Suggested output

A class hierarchy plus a relation set, reusing real vocabulary wherever it fits (see above) —
don't collapse relations with genuinely different semantics (e.g. "part-of" and "variant-of")
into one just because a source BOM does. Serialize as Turtle/OWL if the user's tooling expects
it — see `output/ontology.ttl` for a working example that actually parses — or plain markdown
tables if not. Include the Validate-phase changelog so the user (or an auditor) can see which
conflicts were resolved and how, without re-reading every source doc.

## Demo walkthrough

See `stages/` for a worked example against the fake company "Cairn Drivetrain Co." (`materials/`) — a mid-drive e-bike motor manufacturer whose BOM, supplier catalog, engineering change log, and requirements register all disagree with each other on purpose, to show what Resolve-phase decisions actually look like against real ontology vocabulary.

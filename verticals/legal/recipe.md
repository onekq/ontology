# Legal — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to legal/legislative ontologies.

**If the user has their own real source material** (ordinance/statute registries, amendment logs, codification records, compliance registers), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real standards, not invented vocabulary

For legal/legislative documents specifically, check **[Akoma Ntoso](https://docs.oasis-open.org/legaldocml/akn-core/v1.0/cs01/part1-vocabulary/akn-core-v1.0-cs01-part1-vocabulary.html)** (LegalDocML, OASIS standard) before inventing anything: `FRBRWork`/`FRBRExpression`/`FRBRManifestation` (the abstract-law vs. specific-version vs. rendered-document distinction), `activeModifications`/`passiveModifications` (bidirectional amendment tracking), `@start`/`@end` (validity periods — an `@end` with no `@start` specifically marks a repealed original fragment), `lifecycle`/`temporalData`, and `ref`/`@href` for cross-references.

**Akoma Ntoso is XML-native, with no official RDF/OWL binding — unlike every other vertical's grounding ontology in this project.** If you serialize as Turtle/OWL, say so explicitly: you're constructing your own RDF mapping of real element/attribute names, not using an existing standard RDF vocabulary. That's a meaningfully bigger disclosure than a "simplified triple shape" note — there's no official RDF version to simplify from.

## What to expect in this domain

1. **A law's citation is ambiguous between the abstract law and one dated version of its text** — exactly what `FRBRWork` vs. `FRBRExpression` is for. Resolve this first; several other conflicts depend on it.

2. **Amendment tracking is designed to be bidirectional, and one-sided gaps are a real, common legal-research failure mode.** An amending instrument recording `activeModifications` doesn't guarantee the amended instrument's own record gets a matching `passiveModifications` — add a general integrity check for this pattern, not just a one-off fix.

3. **A repealed provision needs an explicit `@end`, or it keeps looking current.** Akoma Ntoso's own rule — an `@end` with no `@start` marks a repealed original fragment — should be applied literally, not reinvented as a custom convention.

4. **Publicly posted renderings (PDFs, HTML) drift out of sync with the canonical text.** Model the Manifestation's own generation date separately from the Expression's amendment date, and flag when the former predates the latter.

5. **Cross-references can point at citation numbers that later recodification invalidates.** Prefer stable, location-independent targets; flag references older than the most recent recodification event for revalidation.

6. **"Passed," "published," and "legally effective" are often three different dates**, not one. Don't flatten them into a single field if the source material (or the jurisdiction's actual law) distinguishes them.

7. **A records/compliance checkpoint's name can promise more than it checks** — same cross-domain checkpoint-gap pattern as every prior vertical.

## Suggested output

A class hierarchy plus relation set, reusing Akoma Ntoso's real vocabulary wherever it fits, and domain-specific terms only after checking the spec first. If serializing as RDF, disclose the mapping is your own construction (see above) — see `output/ontology.ttl` for a working, rdflib-validated example with that disclosure built in.

## Demo walkthrough

See `stages/` for a worked example against the fictional municipality "City of Thornfield" (`materials/`) — a municipal legal code office whose ordinance registry, amendment log, codification records, legal/clerical glossary, publication requirements, and records-request process notes all disagree with each other on purpose, centered on a realistic one-way amendment-tracking gap.

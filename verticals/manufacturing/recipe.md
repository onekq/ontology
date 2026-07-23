# Manufacturing / Supply Chain — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/unfold.md` first for the general method, then come back here for what's specific to manufacturing/supply-chain ontologies.

**If the user has their own real source material** (BOMs, supplier catalogs, engineering change logs, department glossaries), run the Unfold method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover.

## What to expect in this domain

Manufacturing ontologies almost always snag on the same handful of conflict shapes. Watch for these specifically during Discover and Resolve:

1. **Part-of vs. variant-of vs. sibling-of.** A BOM's parent/child structure conflicts with how a "kit" or "repair kit" or "service pack" version of a product actually relates to the base product. Don't assume the BOM's literal tree is the correct ontology — it's evidence, not the answer.

2. **Same part number, different physical spec across suppliers.** Supplier catalogs cross-reference internal part numbers to their own, and the cross-references are often *approximate* (unit rounding, wrong head/type substituted, "equivalent" marked without engineering sign-off). Each of these is a Resolve-phase decision: are they actually the same part in the ontology, or two parts that happen to share a purchasing shortcut?

3. **Revision drift that isn't linear.** Engineering assumes Rev C supersedes Rev B. Reality is often that both ship concurrently in different product lines. Check change logs for exceptions to the "later revision wins" assumption before modeling revisions as a simple sequence.

4. **Department-local vocabulary collisions.** The same word ("assembly," "controller," "housing") means structurally different things to engineering, procurement, and QA. These aren't typos to fix — they're evidence of genuinely different concepts that need distinct classes, or a documented mapping between department vocabularies.

## Suggested output

A class hierarchy (parts, assemblies, revisions) plus a separate relation set (part-of, variant-of, supersedes, cross-references) — don't collapse "part-of" and "variant-of" into one relation type even if a source BOM does. Serialize as JSON-LD or plain markdown class/relation tables; OWL/TTL if the user's tooling expects it. Include the Validate-phase changelog so the user (or an auditor) can see which conflicts were resolved and how, without re-reading every source doc.

## Demo walkthrough

See `stages/` for a worked example against the fake company "Cairn Drivetrain Co." (`materials/`) — a mid-drive e-bike motor manufacturer whose BOM, supplier catalog, engineering change log, and department glossary all disagree with each other on purpose, to show what Resolve-phase decisions actually look like.

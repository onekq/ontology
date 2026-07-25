# Government — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to public-sector/government ontologies.

**If the user has their own real source material** (service catalogs, org-chart/reorg records, requirements/evidence registers, rule or fee documentation, processing-time logs), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real standards, not invented vocabulary

For government/public-sector ontologies specifically, check two real, actively-maintained standards before inventing anything:

- **[W3C Organization Ontology (ORG)](https://www.w3.org/TR/vocab-org/)** — `Organization`/`OrganizationalUnit`, `hasSubOrganization`/`subOrganizationOf` for org hierarchies, and `ChangeEvent` (a real subclass of **W3C PROV-O's `Activity`**) with `originalOrganization`/`resultingOrganization` for modeling a merger or restructuring as a first-class event, not just a relation update.
- **[CPSV-AP](https://semiceu.github.io/CPSV-AP/releases/3.0.0/)** (Core Public Service Vocabulary Application Profile, EU ISA² programme) — but note it spans **two distinct real namespaces**: `PublicService` and `Rule` live in the base CPSV vocabulary (`http://purl.org/vocab/cpsv#`), while `Requirement`, `Evidence`, `Cost`, `Channel`, `LifeEvent`, `BusinessEvent`, `hasCompetentAuthority`, and `holdsRequirement` live in the CPSV-AP extension namespace (`http://data.europa.eu/m8g/`). Verify both prefixes against the real spec rather than assuming one combined namespace — this project caught that exact mistake by grepping the downloaded spec page before writing Turtle.

## What to expect in this domain

1. **A service delivered through multiple channels (in-person, online, mail) is one service, not several** — model each delivery method as its own real CPSV-AP `Channel`, and flag where requirements aren't uniformly supported across channels rather than letting the gap go unnoticed.

2. **Independent identifier schemes (internal code, state registry ID, federal grant ID, etc.) don't need to be merged or reconciled** — ORG doesn't require any particular scheme. Keep them as separate properties and leave genuinely missing ones absent rather than inferred.

3. **A reorganization is the highest-stakes conflict in this domain**, because it can leave a service pointed at the wrong competent authority — silently misdirecting the public. Model the reorg itself as a real ORG `ChangeEvent`, update `hasCompetentAuthority` to match the new org hierarchy, and add a general integrity check: any service whose competent authority wasn't touched within a reasonable window of an org-hierarchy change should be flagged.

4. **A requirement and the evidence that proves it are often written as if they were two equal requirements.** CPSV-AP's own `Requirement`/`Evidence`/`supportsRequirement` split fixes this directly — it's rarely a modeling gap, usually just a documentation one.

5. **"X days after the triggering event" is ambiguous when the event itself has more than one candidate date** (e.g., a private sale date vs. an official registration date). Resolve which date the event instance's own timestamp should record, favoring the objectively verifiable one.

6. **"Department" can mean two different things**: the real organizational unit HR and finance track, and a website/navigation category that doesn't map 1:1 onto it. Keep the real `OrganizationalUnit` as the source of truth and give the navigation meaning its own domain class, explicitly linked many-to-many.

7. **A linked rule, fee schedule, or procedure document drifts out of sync with the canonical decision that changed it** — the same "canonical fact updates, public rendering doesn't" pattern found in nearly every vertical in this project. Flag staleness rather than trusting the document's presence alone.

8. **A review/audit checkpoint's name can promise more than it checks** — "confirm reviewed" is not the same as "confirm reconciled." Flag exactly what a checkpoint verifies, not what its name implies.

9. **Published processing times and actual processing times disagree, especially during seasonal peaks** — model both as distinct claims rather than forcing them into one number.

## Suggested output

A class hierarchy plus relation set, reusing W3C ORG and CPSV-AP vocabulary wherever it fits, with the dual CPSV/CPSV-AP namespace handled explicitly — see `output/ontology.ttl` for a working, rdflib-validated example, and `output/ontology.md` for the disclosure of a refinement (ORG's `ChangeEvent`) found partway through writing the output.

## Demo walkthrough

See `stages/` for a worked example against the fictional "Elmsworth County" (`materials/`) — a county government whose public-service/org registry, reorg records, requirements/evidence records, department/navigation glossary, rule/cost documentation, and renewal-processing-time notes all disagree with each other on purpose, centered on a 2024 departmental reorganization that a service catalog never caught up with.

# The Unfold Method

A method for building an ontology out of real (messy) source material, one resolved decision at a time. Plain markdown — works with Claude Code, Codex, or any agent that can read a file and follow instructions. No plugin or install step required.

## Premise

An ontology is a claim about what things exist and how they relate. Your source material — specs, catalogs, change logs, department wikis — never agrees with itself about that claim. The gap between "what the docs say" and "what the ontology should say" is where the real work is. Unfold makes that gap visible in stages instead of asking you to resolve it all at once.

This is a staged sibling to relentless-interview-style tools (e.g. `grilling`): instead of one continuous interrogation, the process is broken into named stages you can stop between, skim, or hand to someone else mid-way.

## The four phases

**1. Discover** — Read every source document before drafting anything. Build a raw inventory of every term, code, and relationship mentioned, *without* resolving conflicts yet. A term used two different ways by two departments gets logged twice, not merged.

**2. Draft** — Propose a first-pass class/relation structure from the inventory. Every class needs a one-line definition. Every relation needs its two ends and its cardinality. Mark anything inferred rather than stated in source material as `[inferred]`.

**3. Resolve** — Walk the conflicts the Discover phase surfaced, one at a time, in dependency order (a parent classification decision before the children that hang off it). For each conflict: state the conflict, state the options, propose a recommended resolution, and wait for confirmation before moving to the next. Never batch conflicts — one at a time, same discipline as `grilling`.

**4. Validate** — Check the resolved ontology against the source material again. Does every term in the Discover inventory map to something in the final structure, or was it silently dropped? Produce a changelog of what was merged, split, renamed, or discarded, and why.

## Agent rules

- **Read before asking.** If a fact is in the provided materials, use it — don't ask the user to restate what's already on the page.
- **Decisions are the user's.** Classification calls, naming calls, and "which definition wins" calls belong to the user. Propose a recommended answer, but wait for confirmation.
- **Log every resolution.** Each Resolve-phase decision gets one line in an output changelog: what was decided, and which source conflict it settles. This is what lets someone audit the ontology later without re-deriving it.
- **Don't silently merge terms that might be genuinely distinct.** Two departments using the same word for different things is a Resolve-phase decision, not a Discover-phase cleanup step.

## What a vertical adds on top

Each vertical's `recipe.md` points here for the mechanics, then adds what's specific to that domain: which source material to expect, which conflicts are common in that industry, and what output format the resulting ontology should take (OWL/TTL, JSON-LD, SKOS, or plain markdown — the method doesn't require any one serialization).

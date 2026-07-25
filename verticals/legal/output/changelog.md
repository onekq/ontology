# Resolution Changelog — City of Thornfield

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published standard, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | Yes |
| 6 | 6 | Yes |
| 7 | 7 | Yes |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **"Ordinance 2019-14" ambiguity** resolved with **Akoma Ntoso's real `FRBRWork`/`FRBRExpression`** layering — a bare citation resolves to the current Expression by default.
2. **Clerk filing # / state citation / code section independence** kept as three separate identifiers, cross-indexed rather than one treated as canonical.
3. **The one-sided amendment record** fixed by asserting **`passiveModifications`** on CLK-2019-014 — the spec's real, bidirectional design exists precisely so this kind of gap is structurally visible. A general integrity check (any `activeModifications` target should carry a matching `passiveModifications`) was added, not just this one instance.
4. **The repealed section with no `@end`** fixed by asserting a real **`end`** attribute per Akoma Ntoso's own stated rule: an `end` with no `start` marks a repealed original fragment — the spec's literal words, not an invented convention.
5. **Manifestation drift** resolved with a domain `lastGenerated` date and `manifestationStale: true` flag — the canonical Expression was correct throughout; only the posted rendering had fallen behind.
6. **"Code"/"Section" collision** resolved with a domain `CodifiedCode` aggregate (Clerk's meaning) and a domain `FilingDivision` (Records Office's meaning) — kept distinct from **Akoma Ntoso's real `section`** hierarchical element, same "two real, unrelated concepts sharing a word" pattern as prior verticals' pure naming collisions.
7. **The stale cross-reference** flagged `needsRevalidation: true` against the 2020 recodification event — **Akoma Ntoso's `ref`** mechanism is designed for stable, location-independent targeting; a citation-number reference defeats that.
8. **"Enacted date" conflation** resolved into three distinct **`lifecycle`** events (passed, published, effective) — the spec's event model already supports this; the registry had just flattened it.
9. **Records-request checkpoint gap** flagged with a domain `verifiedCurrentExpression: false` — same cross-domain checkpoint pattern as every prior vertical.
10. **SLA disagreement** kept as two domain `RequestSLA` instances rather than reconciled.

**Two items were explicitly logged as not resolved separately**: REQ-501 (folded into #3) and REQ-503 (folded into #5) — both are the same underlying gaps viewed from the policy side rather than the data side. See Stage 4 (Validate) for the full trace.

## A disclosure carried through from Draft

Unlike every prior vertical's grounding ontology, Akoma Ntoso has no official RDF/OWL binding —
it's an XML Schema vocabulary. This file's `akn:` mapping is this project's own construction
using the real, verified element and attribute names, not an existing standard RDF vocabulary.
Said plainly in `ontology.md` rather than presented as equivalent to IOF Core/FIBO/GoodRelations/
FHIR/ODRL's native RDF status.

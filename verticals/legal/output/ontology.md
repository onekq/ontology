# City of Thornfield — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[Akoma Ntoso](https://docs.oasis-open.org/legaldocml/akn-core/v1.0/cs01/part1-vocabulary/akn-core-v1.0-cs01-part1-vocabulary.html)
(LegalDocML, OASIS standard). See `../stages/03-resolve.html` for the reasoning behind each
choice, and `changelog.md` for a flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## A different kind of "real" than prior verticals

IOF Core, GoodRelations, FIBO, FHIR, and ODRL are all natively RDF/OWL. **Akoma Ntoso is not** —
it's an XML Schema vocabulary (real namespace, verified against the actual OASIS schema:
`http://docs.oasis-open.org/legaldocml/ns/akn/3.0`), with no official RDF/OWL binding. This
Turtle file uses the real element and attribute names from that schema, mapped into RDF by this
project — not an existing standard mapping. That's a materially bigger disclosure than
`ontology.ttl`'s prior "real vocabulary, simplified triple shape" notes (FHIR, retail): here
there's no official RDF version to simplify *from* in the first place.

## Classes

| Class | Source | Definition |
|---|---|---|
| `FRBRWork` | **Akoma Ntoso** | The abstract ordinance as a legal concept. |
| `FRBRExpression` | **Akoma Ntoso** | One specific, dated version of the ordinance's text. |
| `FRBRManifestation` | **Akoma Ntoso** | A specific rendering of an Expression (PDF, XML). |
| `CodifiedCode` | domain | The Clerk's "whole consolidated Code" meaning — an aggregate over current Expressions. |
| `FilingDivision` | domain | The Records Office's "Section" meaning — a filing-folder tab, unrelated to the Code's real hierarchical `section` element. |
| `RequestSLA` | domain | An operational turnaround claim. |

## Relations / attributes

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `activeModifications` / `passiveModifications` | **Akoma Ntoso** | `FRBRWork` | Bidirectional by design; a one-sided gap is a real, structural defect (Conflict 3) |
| `start` / `end` | **Akoma Ntoso** | `FRBRExpression` | Per the spec: an `end` with no `start` marks a repealed original fragment (Conflict 4) |
| `lifecycle` event (`passed`/`published`/`effective`) | **Akoma Ntoso** | `FRBRWork` | Three distinct events, not one flat date field (Conflict 8) |
| `ref` (`href`) | **Akoma Ntoso** | cross-reference | Should target a stable identifier, not a citation number recodification can invalidate (Conflict 7) |
| `lastGenerated` / `manifestationStale` | domain | `FRBRManifestation` (date / boolean) | Flags a Manifestation as stale relative to its Expression (Conflict 5) |
| `clerkFilingNo` / `stateCitation` / `codeSection` | domain | `FRBRWork` | The three independent reference schemes (Conflict 2) |
| `needsRevalidation` | domain | cross-reference (boolean) | Flags a `ref` predating the latest recodification (Conflict 7) |
| `verifiedCurrentExpression` | domain | records-request checkpoint (boolean) | `false` where a checkpoint doesn't check currency (Conflict 9) |

## Worked instances

- **CLK-2019-014** (`FRBRWork`) — `FRBRExpression` as of 2019-06-01; **`passiveModifications`** now asserted, pointing to CLK-2023-007
- **CLK-2023-007** — **`activeModifications`** targeting CLK-2019-014's Expression
- **TMC 9.04.010's Expression** — real `end` attribute asserted at the 2021 repeal date, no `start` (per the spec's own repeal rule)
- **TMC 14.20.030's Manifestation** — `lastGenerated: 2022`, flagged stale against its 2023 Expression
- **Stale `ref`** in TMC 14.20.030 — flagged for revalidation against the 2020 recodification event
- **Two `RequestSLA` instances** — published (10 days) and actual for code-section requests (18 days), kept separate

## Known gaps

- **This file's RDF mapping of Akoma Ntoso is this project's own**, not an official OASIS RDF binding — disclosed above, not glossed over.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

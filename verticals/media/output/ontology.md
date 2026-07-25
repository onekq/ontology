# Amberlane Media — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[ODRL](https://www.w3.org/TR/odrl-model/) (Open Digital Rights Language, W3C Recommendation).
See `../stages/03-resolve.html` for the reasoning behind each choice, and `changelog.md` for a
flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `Policy` | **ODRL** | Umbrella concept, with subtypes `Set`, `Offer`, `Agreement`. |
| `Permission` | **ODRL** | "The ability to exercise an Action over an Asset." |
| `Prohibition` | **ODRL** | "The inability to exercise an Action over an Asset." |
| `Duty` | **ODRL** | "The obligation to exercise an agreed Action." |
| `Asset` | **ODRL** | Covers both a digital photo and a physical studio space. |
| `UsageEvent` | domain | A recorded instance of actual use, checked against a Policy's constraints. |
| `ComplianceCheck` | domain | A recurring verification process — ODRL models the constraint, not the checking mechanism. |
| `PaymentRecord` | domain | Finance's running royalty figure, distinct from the contracted term it should match. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `action` (`license` / `sell` / `give` / `distribute` / `use`) | **ODRL** | `Rule` | `sell`/`give` delete the original asset per ODRL's own definitions; `license`/`use` don't (Conflict 4) |
| `target` | **ODRL** | `Rule` → `Asset` | |
| `constraint` (`leftOperand`/`operator`/`rightOperand`) | **ODRL** | `Rule` → `Constraint` | Real structure, not a simplification — used for `spatial`/`purpose`/`timeInterval` (Conflicts 3, 9) and `percentage` (Conflict 10) as real left-operands |
| `syndicationId` / `creatorCatalogNo` | domain | `Asset` | Independent of each other and of the ODRL asset URI itself; missing ones left absent (Conflict 2) |
| `lastSynced` | domain | (date) | Flags billing's copy of a Policy's terms as a derived, possibly-stale record rather than an independent fact (Conflict 5) |
| `conflictsWithProhibition` | domain | `Permission` (boolean) | Flags a Permission that overlaps a still-active Prohibition without resolving which wins (Conflict 3) |
| `internalLabelDisagreesWithTerms` | domain | `Policy` (boolean) | Flags a casual label that contradicts the signed action (Conflict 4) |
| `withinSpatialConstraint` | domain | `UsageEvent` (boolean) | `false` where usage violated the constraint (Conflict 6) |
| `hasScheduledComplianceCheck` | domain | `Policy` (boolean) | `false` where no recurring check exists (Conflict 7) |
| `dutyFulfillmentVerified` | domain | `Duty` (boolean) | `false` where an obligation's fulfillment was never confirmed (Conflict 8) |

## Worked instances

- **POL-9001** (`Agreement`) — action `distribute`, `target` AMB-40012, three real `odrl:constraint` blank nodes: `spatial eq "North America"`, `purpose eq "editorial"`, `timeInterval eq "2024-01-01/2025-12-31"`
- **POL-9002** (`Prohibition`) — action `distribute`, `target` AMB-40012, constraint `industry isAnyOf "competing outdoor apparel brands"`; POL-9001 flagged `conflictsWithProhibition: true`
- **POL-9010** — action `license` (not `sell`), `internalLabelDisagreesWithTerms: true`
- **UsageEvent-FR-DE-2025** — `target` AMB-40012, `withinSpatialConstraint: false`
- **POL-9001** — `hasScheduledComplianceCheck: false`
- **Duty-Attribution-POL9001** — action `attribute`, `dutyFulfillmentVerified: false`
- **Two `use` Permissions on Studio A** — each with its own `timeInterval` constraint for 2026-03-10, overlapping, the double-booking made directly visible
- **Duty-Royalty-POL9001** — real `odrl:constraint` with `percentage eq 15` (the contracted term)
- **PaymentRecord-JamieTran-POL9001** — domain `reportedPercentage: 12`, diverging from the contracted 15%

## Known gaps

- **`UsageEvent`, `ComplianceCheck`, and `PaymentRecord` are domain classes, not ODRL ones** — ODRL models rights and obligations, not monitoring/reconciliation processes. That's a real boundary of what the ontology covers, not an oversight.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

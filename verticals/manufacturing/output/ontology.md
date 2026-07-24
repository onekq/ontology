# Cairn Drivetrain Co. — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in the
[IOF Core Ontology](https://github.com/iofoundry/ontology) plus W3C PROV-O, W3C SKOS, and QUDT
where IOF Core doesn't reach. See `../stages/03-resolve.html` for the reasoning behind each
choice, and `changelog.md` for a flat list of what was decided. A machine-readable version is at
[`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `Product` | domain | A top-level sellable unit. |
| `Assembly` | **IOF Core** | A `MaterialArtifact` with a component part at all times. |
| `PurchasedKit` | domain | A unit bought as one line item from a vendor — Procurement's meaning of "assembly," which IOF Core's structural `Assembly` doesn't cover. |
| `Part` | domain | A leaf-level component. |
| `Identifier` | **IOF Core** | Denotes a thing via `denotes`/`designates`. Not the thing itself — critical for the ROT-320 case, where one display string denoted two different physical parts. |
| `Manufacturer` | **IOF Core** | An `Organization` bearing `ManufacturerRole`. |
| `Supplier` | **IOF Core** | An `Organization` bearing `SupplierRole` — distinct from `Manufacturer`; one org can hold both roles, or only one. |
| `MotorControlUnit` | domain | Canonical name for CTL-400 (alias: `ControllerBoardAssembly`). |
| `MotorHousing` | domain | Cast aluminum motor enclosure (HSG-500). |
| `ShippingContainer` | domain | Outer logistics/freight crate — unrelated to `MotorHousing`. |
| `AssemblyProcess` | **IOF Core** | A process that produces an `Assembly`. First used for Station 2, not needed by the catalog-only material. |
| `MeasurementProcess` / `ProcessCharacteristic` | **IOF Core** | A process that measures something, and the specific thing it measures. Models Station 2's QC checkpoint precisely enough to state *what it does and doesn't check*. |
| `PlanSpecification` | **IOF Core** | An information content entity describing a plan — used for both the work instruction's and Production Planning's cycle-time figures, kept as two instances rather than one. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `hasComponentPartAtSomeTime` | **IOF Core** | `Product`/`Assembly` → `Part`/`Assembly` | Used instead of `AtAllTimes` wherever a part is scoped to one product line, not globally true |
| `wasDerivedFrom` | **W3C PROV-O** | `Product` → `Product` | MTR-100R → MTR-100 |
| `wasRevisionOf` | **W3C PROV-O** | `Identifier` → `Identifier` | ROT-320-RevC → ROT-320-RevB |
| `exactMatch` / `closeMatch` | **W3C SKOS** | `Part` → vendor cross-reference | Confidence-graded equivalence; a disproven match (Value Bolt) gets neither |
| `hasRole` (→`ManufacturerRole`/`SupplierRole`) | **IOF Core** | `Organization` → `Role` | Manufacturer left unfilled where genuinely unknown, not defaulted to the vendor |
| `alternativeTo` | domain | `Part` → `Part` | FST-004 ↔ FST-004-2; not a standard predicate, no clean IOF/PROV/SKOS fit |
| `mayCorrespondTo` | domain | `Assembly` → `PurchasedKit` | Optional, unused by any current instance — see note below |
| `requirementSatisfiedBy` | **IOF Core** | `RequirementSpecification` → `DesignSpecification` | Treated as re-verify-on-change, not a static pointer (Conflict 8) |
| `hasProcessCharacteristic` | **IOF Core** | `MeasurementProcess` → `ProcessCharacteristic` | Station 2's checkpoint points at "magnet presence," not "rotor identifier" — the gap made explicit (Conflict 9) |
| `containsOccurrenceOf` | **IOF Core** | `AssemblyProcess` → `MeasurementProcess` | Station 2 contains its own QC checkpoint as a sub-process |

## Worked instances

- **MTR-100** (`Product`) — `hasComponentPartAtSomeTime` → STA-200, ROT-320-RevC, MotorControlUnit, MotorHousing (scoped to main production line)
- **MTR-100R** (`Product`) — `wasDerivedFrom` → MTR-100; `hasComponentPartAtSomeTime` → ROT-320-RevB
- **ROT-320-RevC** (`Identifier`, denotes the 8×N42 magnet part) — `wasRevisionOf` → ROT-320-RevB (denotes the 6×N38 part — a *different* physical part sharing the old display string)
- **FST-004** — `exactMatch` → Meridian MF-SC-0412Z; `closeMatch` → Tri-Star TS-4120 (12mm vs. 12.7mm, quantified via QUDT); *no match property* → Value Bolt VB-M412SH (confirmed wrong head type)
- **FST-004** — `alternativeTo` → FST-004-2 (zinc-nickel, outdoor/corrosion contexts)
- **REQ-002** — `requirementSatisfiedBy` → ROT-320-RevC only; flagged for re-verification wherever a downstream product (MTR-100R) resolves to ROT-320-RevB instead
- **Station 2 — Rotor Install** (`AssemblyProcess`) — `containsOccurrenceOf` → a `MeasurementProcess` whose `hasProcessCharacteristic` is "magnet presence" — explicitly *not* "which `Identifier`," which is the queryable form of Conflict 9's gap
- **Two cycle-time `PlanSpecification`s** for the same stations (Production Engineering's work instruction vs. Production Planning's capacity table) — kept as two instances with disagreeing figures, not reconciled into one number

## Known gaps

- **`mayCorrespondTo` is declared but has no worked instance.** No part in the current source
  material is genuinely a `PurchasedKit` — STA-200 is explicitly *not* one (built in-house). The
  relation exists for when a future part actually needs it, not as a proven pattern yet.
- **`ShippingContainer` is declared but has no instance**, for the same reason: no source document
  describes a concrete shipping crate as a trackable part with its own identifier. It resolves the
  *naming* collision from the department glossary; it doesn't yet model a real thing.
- Full picture, including which conflicts have a worked example in `ontology.ttl` and which are
  class-only, is in the changelog.

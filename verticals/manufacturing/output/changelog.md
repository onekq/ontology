# Resolution Changelog — Cairn Drivetrain Co.

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology, not invented for this project. This
list itemizes 9 entries against Resolve's 8 conflicts — #3 and #4 below both come from
Resolve's single "Conflict 3" (vendor cross-references), split here because they're independently
auditable decisions. "In ontology.ttl?" marks whether a worked instance exists in the machine-readable file, or only a class declaration.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 3 | Yes |
| 5 | 4 | Yes |
| 6 | 5 | Class only — no part is genuinely a PurchasedKit yet |
| 7 | 6 | Yes |
| 8 | 7 | MotorHousing yes; ShippingContainer class only, no source data to instantiate |
| 9 | 8 | Yes |

1. **MTR-100R** modeled as its own `Product` linked by **PROV-O's `wasDerivedFrom`** to MTR-100, not as a child part — it's independently tracked and, per REQ-002, doesn't always meet the same spec.
2. **ROT-320**'s two physically different magnets (Rev B: 6×N38, Rev C: 8×N42) split into two **IOF Core `Identifier`** instances linked by **PROV-O's `wasRevisionOf`**, each `denotes`-ing a distinct part — the shared display string is not treated as a single identity. BOM relationships use **IOF Core's `hasComponentPartAtSomeTime`**, not `AtAllTimes`, since neither revision is globally true across product lines.
3. **FST-004 vendor cross-references** kept at three different confidence levels using **SKOS**: `exactMatch` (Meridian), `closeMatch` (Tri-Star, now backed by actual **QUDT** quantity values showing a real 0.7mm gap, not an eyeballed one), and *no match property at all* for Value Bolt — a confirmed wrong part shouldn't be modeled as merely unverified.
4. **Vendor vs. manufacturer** split into **IOF Core's `ManufacturerRole`** and `SupplierRole` — left unfilled for Tri-Star and Value Bolt where genuinely unknown, rather than silently defaulting to the vendor's identity.
5. **FST-004 / FST-004-2** kept as two `Part`s related by a domain-specific `alternativeTo` — checked against IOF Core, PROV-O, and SKOS first; none fit cleanly, so a custom predicate was used deliberately rather than by default.
6. **"Assembly"** resolved as **IOF Core's own `Assembly` class** for Engineering's meaning (a `MaterialArtifact` with a component part at all times) plus a domain-specific `PurchasedKit` for Procurement's commercial meaning, which IOF Core's structural definition doesn't reach — related by `mayCorrespondTo`, declared but not yet instantiated (no current part is genuinely a kit).
7. **"Controller"** resolved to `MotorControlUnit`, with `ControllerBoardAssembly` kept as a deprecated alias. No class for the QA job role.
8. **"Housing"** split into unrelated `MotorHousing` (instantiated as HSG-500) and `ShippingContainer` (declared to resolve the naming collision, but not instantiated — no source material describes an actual trackable shipping-crate part).
9. **REQ-002 / REQ-014**'s `requirementSatisfiedBy` links (**IOF Core**) treated as needing re-verification on change, not static pointers — directly motivated by REQ-002 currently being violated by a product still on the price list.

**Two items were explicitly logged as not resolved**, not silently dropped: partial classification-code coverage (a data-completeness gap, not a conflict), and REQ-009 (folded into #9 as the same underlying defect rather than fixed twice). See Stage 4 (Validate) for the full trace.

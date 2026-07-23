# Cairn Drivetrain Co. — Resolved Ontology

Output of the Unfold method applied to `materials/`. See `changelog.md` for why each decision was made.

## Classes

| Class | Definition |
|---|---|
| `Product` | A top-level sellable unit. |
| `StructuralAssembly` | A BOM node with children, regardless of purchasing method. |
| `PurchasedKit` | A unit bought as one line item from a supplier. |
| `Part` | A leaf-level component. |
| `SupplierCrossReference` | A supplier's own part number/description mapped to an internal `Part`. |
| `Revision` | A dated snapshot of a part's design, scoped to a shipping context. |
| `MotorControlUnit` | Canonical name for CTL-400 (alias: `ControllerBoardAssembly`). |
| `MotorHousing` | Cast aluminum motor enclosure (HSG-500). |
| `ShippingContainer` | Outer logistics/freight crate — unrelated to `MotorHousing`. |

## Relations

| Relation | Domain → Range | Cardinality | Notes |
|---|---|---|---|
| `hasPart` | `Product`/`StructuralAssembly` → `Part`/`StructuralAssembly` | 1..* | |
| `derivedFrom` | `Product` → `Product` | 0..1 | MTR-100R → MTR-100 |
| `supersedes` | `Revision` → `Revision` | 0..1 | Scoped by `shippingContext`, not global |
| `crossReferencedAs` | `Part` → `SupplierCrossReference` | 0..* | May carry `unverified-equivalent` flag |
| `alternativeTo` | `Part` → `Part` | 0..* | FST-004 ↔ FST-004-2 |
| `mayCorrespondTo` | `StructuralAssembly` → `PurchasedKit` | 0..1 | Optional; not all assemblies are kits |

## Worked instances

- **MTR-100** (`Product`) —`hasPart`→ STA-200, ROT-300 (Rev C), MotorControlUnit, MotorHousing
- **MTR-100R** (`Product`) —`derivedFrom`→ MTR-100; `hasPart`→ ROT-300 (Rev B)
- **ROT-300 Rev B** —`supersedes`(scope: main production line)→ *superseded by* ROT-300 Rev C; `shippingContext`: field-service kits only
- **FST-004** —`crossReferencedAs`→ Meridian MF-SC-0412Z (verified), Tri-Star TS-4120 (unverified-equivalent), Value Bolt VB-M412SH (unverified-equivalent, wrong head type)
- **FST-004** —`alternativeTo`→ FST-004-2 (zinc-nickel, outdoor/corrosion contexts)

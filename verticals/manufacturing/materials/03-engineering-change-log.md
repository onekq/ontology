# Engineering Change Notice Log — MTR-100 Rotor & Controller

## ECN-101 (2023-11-02)
Rotor Rev B released. 6x Neodymium magnet, N38 grade. Baseline for MTR-100 production and MTR-100R field service kits.

## ECN-118 (2025-02-14)
Rotor Rev C released. Magnet grade upgraded N38 → N42, count increased 6 → 8, for torque improvement on steep-grade use cases.

> Effective for MTR-100 main production line immediately. **Legacy field service kits continue to ship Rev B (6-magnet, N38) rotors until existing inventory (~1,200 units as of this ECN) is depleted — do not update the service BOM until Q3.**

This note is the only place that documents that MTR-100 and MTR-100R currently ship *different rotor specs under the same conceptual part*. The BOM export (`01-bill-of-materials.csv`) does not reflect this — it lists Rev C (8 magnets) uniformly, including under the MTR-100R line.

## ECN-124 (2025-06-30)
Renamed "Controller Board Assembly" (CTL-400) to "Motor Control Unit" on all new engineering drawings, to avoid confusion with the Quality Controller role (see department glossary). ERP/procurement records were not updated — CTL-400 is still labeled "Controller Board Assembly" in the purchasing system and on the BOM export.

## Open question flagged by Engineering, never resolved
Is `MTR-100R` a **variant** of `MTR-100` (same product, different configuration/rotor spec), or a **distinct product** that happens to share a naming prefix and ships a legacy rotor spec on purpose? Procurement's service BOM models it as a child part. Engineering's drawing register models it as an independent top-level assembly with its own revision history. No ECN has ever settled this.

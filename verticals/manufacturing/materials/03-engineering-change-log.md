# Engineering Change Notice Log — MTR-100 Rotor & Controller

Effectivity dates for what shipped when now live on the BOM export itself (`01-bill-of-materials`)
— this log covers rationale, not dates.

## ECN-101 (2023-11-02)
Rotor Rev B released. 6× Neodymium magnet, N38 grade. Baseline for MTR-100 production.

## ECN-118 (2025-02-14)
Rotor Rev C released. Magnet grade upgraded N38 → N42, count increased 6 → 8, for torque
improvement on steep-grade use cases. Effective for MTR-100 main production line. Field-service
inventory of Rev B rotors (~1,200 units at time of release) continues to be drawn down under the
same part number — see the BOM's open-ended effectivity date on the Rev B row.

## ECN-124 (2025-06-30)
Renamed "Controller Board Assembly" (CTL-400) to "Motor Control Unit" on all new engineering
drawings, to avoid confusion with the Quality Controller role (see department glossary). ERP was
not updated — CTL-400 is still labeled "Controller Board Assembly" in the purchasing system.

## Open question, never resolved
Is `MTR-100R` a **variant** of `MTR-100`, or a **distinct product** that happens to share a naming
prefix? Procurement's service BOM models it as a child part that silently pulls whichever ROT-300
revision is in stock. Engineering's drawing register models it as an independent top-level assembly.
No ECN has ever settled this — see `05-requirements.md` for why it isn't just a bookkeeping question.

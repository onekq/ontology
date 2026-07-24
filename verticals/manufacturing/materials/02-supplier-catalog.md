# Fastener Cross-Reference — Approved Vendor Catalog

Maintained by Procurement in a single "Vendor" field per line — the ERP has no separate
Manufacturer field, so for resold parts nobody's system of record distinguishes who
actually made the part from who sold it.

## FST-004 (per Engineering BOM: "M4x12 SHCS")

| Vendor | Their Part # | Their Description | Actual manufacturer | Notes |
|---|---|---|---|---|
| Meridian Fasteners (domestic) | MF-SC-0412Z | Socket Head Cap Screw, M4 x 12mm, Zinc Plated | Meridian Fasteners (makes what it sells) | Exact spec match |
| Tri-Star Hardware (overseas) | TS-4120 | 4mm x 0.5in Cap Screw | Not recorded — Tri-Star's catalog doesn't say, and the vendor field only has room for one name | 0.5in = 12.7mm, not 12mm. Cross-ref sheet marks this "equivalent" — Engineering never signed off on the 0.7mm difference |
| Value Bolt Supply | VB-M412SH | M4x12 Button Head Cap Screw | Unknown — Value Bolt is a reseller/distributor, not a manufacturer, and won't disclose its source on request | **Wrong head type** — button head, not socket head. Flagged twice in receiving, still listed as an approved cross-ref |

## FST-004 vs FST-004-2

Purchase order history uses the shorthand `FST-4-12` interchangeably for both:
- `FST-004` — original zinc-plated spec, from Meridian (above)
- `FST-004-2` — zinc-nickel coated revision, added 2025 for outdoor/corrosion-prone housing mounts, also from Meridian

No PO in the last 18 months distinguishes which one was actually received. Receiving logs the shorthand, not the full part number.

## FST-002 (per Engineering BOM: "M3x8 SHCS")

| Vendor | Their Part # | Their Description | Actual manufacturer |
|---|---|---|---|
| Meridian Fasteners | MF-SC-0308Z | Socket Head Cap Screw, M3 x 8mm, Zinc Plated | Meridian Fasteners |
| Tri-Star Hardware | TS-3080 | 3mm x 8mm Cap Screw | Tri-Star Hardware (confirmed on their spec sheet for this line only) |

No conflicts on this one — included as a control example; not every part is a mess, and not every Tri-Star line is missing manufacturer info.

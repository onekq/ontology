# Storefront Requirements Register (excerpt)

Maintained by Compliance/Product. Each requirement has a "Satisfied by" field set once and rarely
revisited.

## REQ-101 — Hazardous shipping notice
> Any product containing a lithium battery must display a hazardous-shipping restriction notice
> at checkout.

**Satisfied by:** the `hazmat_flag` on category `Electronics > Batteries`.

The Cascade Headlamp 300 (ALD-LT-HEADLAMP-01) contains a rechargeable lithium battery but is
categorized under `Outdoor Gear > Lighting` (`OUT-LGT-HEAD-01`), which carries no hazmat flag.
The requirement is satisfied for the category it names, and violated for a real product that
should trigger it.

## REQ-102 — Refurbished condition badge
> Any offer with condition "Refurbished" must display a distinct condition badge and a modified
> return window.

**Satisfied by:** the `item_condition` field on each offer.

OutdoorLiquidators' offer for GTIN 00612345678905 has `item_condition = Refurbished` but its own
description text claims "brand new... never used" — the field that's supposed to satisfy this
requirement contradicts the seller's own listing copy.

## REQ-103 — Capacity accuracy
> Every backpack variant must display its actual current capacity in liters.

**Satisfied by:** the `variant_attr` field on the product catalog.

ALD-BP-CASCADE-60-SG still lists "60L" after the manufacturer's 2025 frame redesign quietly
reduced actual capacity to 55L under the same GTIN. Nobody re-checked this requirement against
the catalog after the redesign.

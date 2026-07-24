# MTR-100 Requirements Register (excerpt)

Maintained by the engineering PM. Each requirement has a "Satisfied by" field pointing at a
design element — filled in once at requirement creation and rarely revisited when the design
changes underneath it.

## REQ-002 — Torque
> Rotor shall deliver minimum 45 Nm continuous torque at rated RPM.

**Satisfied by:** ROT-300 Rev C (N42 magnets, 8×).

Rev B (N38, 6×) does not meet this requirement — it was written after Rev B's launch, specifically
to justify the Rev C upgrade. `MTR-100R`, which per the BOM pulls whichever ROT-300 revision is in
stock (currently Rev B), is still listed on the service parts price list as a spec-compatible
replacement part. Nobody has re-checked that claim against REQ-002.

## REQ-009 — Corrosion resistance
> Fastener assemblies exposed to outdoor conditions shall use corrosion-resistant hardware.

**Satisfied by:** FST-004-2 (zinc-nickel coating).

The BOM doesn't mark which specific mount points count as "exposed to outdoor conditions" vs.
internal — so it's not actually clear which of the FST-004 line items should be FST-004-2 instead.

## REQ-014 — Ingress protection
> Motor housing shall provide IP65 ingress protection for outdoor/wet-weather riding conditions.

**Satisfied by:** HSG-500 assembly per drawing DWG-HSG-500-C.

GSK-001 (housing gasket) was switched to a cheaper silicone compound in an unrelated cost-reduction
pass — that change isn't recorded in the ECN log, and nobody re-verified IP65 compliance after the
material swap. The "Satisfied by" link on this requirement is stale in a way nothing in the BOM or
change log surfaces on its own.

# Safety Case Requirements Register (excerpt)

Maintained by the safety engineering team, structured the way ISO 26262 / UL 4600-style safety
cases are: each requirement has a "Satisfied by" field pointing at a specific software or hardware
element, filled in at requirement creation and rarely revisited when that element changes.

## REQ-AV-014 — Pedestrian detection range
> The perception system shall detect pedestrian presence and intent at a minimum range of 40m in
> clear weather, low-light included.

**Satisfied by:** perception-v7.2.0 (validated detection range: 45m).

perception-v7.2.0 was superseded by perception-v7.3.1 (see `04-software-release-log.md`), which
reduced the low-light detection range to 38m — below this requirement's 40m minimum. Nobody
re-verified REQ-AV-014 against the new release, because the release wasn't flagged as
safety-relevant in the system that would normally trigger that re-check.

## REQ-AV-022 — Emergency braking subsystem ASIL rating
> The emergency braking subsystem shall be designed and verified to ASIL-D per the original hazard
> and risk analysis (HA-2023-08).

**Current supplier component spec (Q2 2025 redesign):** rates the same subsystem **ASIL-C**,
following a hardware redesign that removed a redundant brake-pressure sensor deemed "unnecessary
given planning-stack improvements." No formal re-rating review against HA-2023-08 is on record —
the ASIL-C figure comes from the supplier's own updated component datasheet, not from Overland's
safety team re-running the hazard analysis.

## REQ-AV-031 — Lidar minimum range (control example)
> The primary lidar unit shall provide usable returns at a minimum range of 120m.

**Satisfied by:** Sensor Pod v3.2 lidar unit (validated range: 150m). No open conflict — the
Sensor Pod v3.1 → v3.2 upgrade improved lidar range and the requirement was re-verified as part of
that release.

# Software Release Log

Two systems of record for the same deployed builds, maintained by different teams, using
different naming schemes.

## Fleet Ops release notes (rider-facing changelog + fleet dashboard)

| Label | Date | Summary |
|---|---|---|
| Build 4.11.0 | 2025-04-02 | Route planning improvements, reduced wait times |
| Build 4.12.0 | 2025-05-20 | Perception update — reduced false-positive braking events |
| Build 4.12.2 | 2025-06-05 | Bugfix patch on top of 4.12.0 |

## Engineering build manifest (per-component versioning)

| Bundle | Date | Components |
|---|---|---|
| — | 2025-04-02 | perception-v7.1.4, planning-v2.8.0, control-v1.4.4 |
| — | 2025-05-20 | perception-v7.3.1, planning-v2.9.0, control-v1.4.4 |
| — | 2025-06-05 | perception-v7.3.1, planning-v2.9.0, control-v1.4.4 (bundle repackaged, no component changed) |

**Fleet Ops "Build 4.12.2" and Engineering's `perception-v7.3.1 + planning-v2.9.0 + control-v1.4.4`
bundle are the same deployed artifact** — the 2025-06-05 repackage changed no component, only the
bundle's build number. Nothing links the two labels to each other in either system; an incident
investigator has to know this by asking someone who remembers.

## The perception-v7.3.1 change, in engineering's own commit notes

> Reduced pedestrian detection range in low-light conditions from 45m to 38m to cut false-positive
> emergency-braking events (rider comfort complaint volume was the driver for this change).
> Detection accuracy at the reduced range is unchanged.

The release-notes template Fleet Ops used to publish "Build 4.12.0" only has checkboxes for
**New feature / Bug fix / Performance** — there is no field for "changed a detection-envelope
value," so this change was published under **Performance** and never flagged as safety-relevant.
See `05-safety-case-requirements.md` — REQ-AV-014 assumes a 40m detection range and was never
re-verified against this change.

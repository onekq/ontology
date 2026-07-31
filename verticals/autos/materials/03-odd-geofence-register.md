# Operational Design Domain &amp; Service Area Register

Three different teams each maintain their own definition of "where Overland vehicles are allowed
to operate," and none of the three documents is derived from either of the other two.

## Mapping's ODD polygon (Dunmore)

Maintained per [ASAM OpenODD](https://www.asam.net/standards/detail/openodd/)-style condition
scoping: road class, weather, and speed range each have to be independently validated against
real sensor data before a segment is added.

- Arterial roads, posted speed ≤ 45 mph, validated in clear and light-rain conditions.
- **Colby Bridge is explicitly excluded** — steel-grate deck geometry produces radar returns the
  perception stack was never validated against. Flagged `not-validated`, not `validated-clear-only`.
- Unincorporated Ashcombe County roads are not in this polygon at all — Mapping only builds
  polygons inside jurisdictions Regulatory Affairs has told them are permitted, and nobody told
  them Ashcombe County isn't.

## Regulatory Affairs' permitted jurisdiction boundary (Dunmore)

Drawn directly from the CA DMV Deployment Permit (see `06-regulatory-permit-register.md`):
**City of Dunmore limits only.** Explicitly does not extend into unincorporated Ashcombe County,
regardless of what any route or map elsewhere shows.

## Product's marketing "Dunmore Metro" service area

Drawn by the marketing team as a 15-mile radius circle around the Dunmore depot, for the launch
website's service-area map. It was never checked against either of the two documents above. It
visually includes:

- The Colby Bridge corridor (outside Mapping's validated ODD).
- **Ashcombe Commons** shopping center, reachable only by crossing Colby Bridge or by a 400m stretch
  of unincorporated Ashcombe County road (outside both Mapping's ODD *and* Regulatory's permit
  boundary).

No one owns reconciling these three documents against each other. Ashcombe Commons is currently a
requestable pickup point in the rider app.

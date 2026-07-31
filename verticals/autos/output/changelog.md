# Resolution Changelog — Overland Autonomy

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology or standard, not invented for this
project. "In ontology.ttl?" marks whether a worked instance exists in the machine-readable file,
or only a class declaration.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | Yes |
| 6 | 6 | Yes |
| 7 | 7 | Yes — as two competing claims, deliberately unresolved |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **Marketed vs. operational automation level** split into a static `marketedAutomationLevel` on **schema.org's `Vehicle`** and a separate per-trip `operationalAutomationLevel` on a new `TripContext`, both referencing **SAE J3016**'s real L0–L5 scale via **SKOS** — not a second static vehicle property, since operational level genuinely depends on metro and permit context.
2. **FLT-0231**'s reused fleet ID split into two time-qualified `Identifier`s `denotes`-ing two different VINs — the shared display string is not treated as a single identity, same discipline as manufacturing's ROT-320 case.
3. **Mapping's ODD polygon, Regulatory's permit boundary, and Marketing's service-area map** kept as three distinct domain classes (`OperationalDesignDomain`, ASAM-OpenODD-informed; `PermitBoundary`; `MarketingServiceArea`) rather than one "supported area" concept. Genuine overlaps get **SKOS** `closeMatch`; Ashcombe Commons and the Colby Bridge corridor get **no match property at all** — confirmed outside both real boundaries, not merely unverified.
4. **INC-0442**'s three cause determinations (telemetry, safety driver, engineering review) kept as three separate **PROV-O** `Attribution`s on one event, rather than collapsed into a single "cause" field — with an explicit `regulatoryFilingOf` flag marking which one was actually submitted under NHTSA SGO 2021-01.
5. **Build 4.12.2 / perception-v7.3.1 bundle** modeled as one `SoftwareRelease` with two `Identifier`s and a **SKOS** `exactMatch` between them — the two labels denote the literally identical deployed artifact, unlike Conflict 3's genuinely different area scopes.
6. **perception-v7.3.1's unflagged detection-range reduction** resolved by making any `SoftwareRelease` that changes a value a `SafetyRequirement` depends on set that requirement's `requiresReverification` flag automatically — REQ-AV-014 is currently flagged stale as a direct result, reflecting a requirement genuinely unmet by production software.
7. **REQ-AV-022's ASIL-D vs. ASIL-C disagreement** kept as two dated, attributed claims (via **SKOS** concepts from the real **ISO 26262** ASIL scale plus **PROV-O** attribution) rather than resolved to either number — deployment sign-off should be blocked on this, not silently pass.
8. **Ashcombe Commons / Colby Bridge route** modeled as a `PermitBoundaryExcursion` — compliance is checked against full route geometry, not just trip endpoints, which is exactly the gap that let the pickup point go live in the rider app.
9. **Safety driver required vs. present** split into `Permit.safetyDriverRequired` (policy rule) and a **SOSA**-sourced `SeatOccupancyObservation.safetyDriverPresent` (observed fact) — the fleet-wide roster toggle conflated the two in both directions (FLT-0244 required-but-absent, Dunmore not-required-but-still-flagged-required).
10. **Mapping's 45mph vs. Perception Engineering's 35mph** for the same road class kept as two separate **SOSA** `Observation`s attributed to their respective teams via **PROV-O** `wasAssociatedWith`, rather than averaged or defaulted to one figure — the 10mph gap is itself the fact worth surfacing.

**No item from Discover was silently dropped.** REQ-AV-031 (lidar range) and the Sensor Pod v3.0
retrofit note are logged in Stage 4 (Validate) as checked-with-no-conflict, not omitted.

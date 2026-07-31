# Overland Autonomy — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[schema.org's Vehicle](https://schema.org/Vehicle) vocabulary, [W3C/OGC SOSA/SSN](https://www.w3.org/TR/vocab-ssn/),
W3C PROV-O, and W3C SKOS — the last used both for cross-reference confidence and to represent two
real external controlled vocabularies (SAE J3016 automation levels, ISO 26262 ASIL ratings) as
queryable concept schemes. See `../stages/03-resolve.html` for the reasoning behind each choice,
and `changelog.md` for a flat list of what was decided. A machine-readable version is at
[`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `Vehicle` | **schema.org** | The physical vehicle, identified by `vehicleIdentificationNumber` — the ontology's durable identity anchor. |
| `Identifier` | domain | Denotes a thing via `denotes`, time-qualified. Not the thing itself — critical for FLT-0231, where one fleet-ID string denoted two different vehicles at different times. |
| `SAE-J3016-Level` | **W3C SKOS** (`skos:Concept`) | One of L0–L5 from the real SAE J3016 automation-level scale, modeled as a `skos:ConceptScheme` rather than a free-text string. |
| `ASIL-Rating` | **W3C SKOS** (`skos:Concept`) | One of QM/A/B/C/D from the real ISO 26262 ASIL scale, same treatment. |
| `OperationalDesignDomain` | domain, **ASAM OpenODD**-informed | A validated set of road-class/weather/speed conditions. ASAM OpenODD is the real published standard for this concept, but is XML/schema-based, not RDF — this class borrows its condition-scoping pattern rather than claiming a native serialization. |
| `PermitBoundary` | domain | A jurisdiction boundary derived from a specific `Permit`. |
| `MarketingServiceArea` | domain | Product's rider-facing "supported area" claim — no real ontology reaches this; drawn independently of the other two area concepts on purpose, per the source material. |
| `Permit` | domain | A DMV/municipal authorization (Testing or Deployment), with conditions including `safetyDriverRequired`. |
| `SoftwareRelease` | domain, **PROV-O** `Entity` pattern | A bundle of independently-versioned components released together under one or more labels. |
| `SafetyRequirement` | domain, IOF-Core-inspired | A requirement with a `requirementSatisfiedBy` link to a specific `SoftwareRelease` or hardware element. |
| `sosa:Observation` (subclassed as `DisengagementEvent`, `DetectionObservation`, `SpeedEnvelopeObservation`, `SeatOccupancyObservation`) | **W3C/OGC SOSA** | An act of observing a property of a feature of interest — the base pattern for every telemetry- or sensor-sourced claim in this ontology. |
| `PermitBoundaryExcursion` | domain | A trip-route segment that falls outside a `PermitBoundary`, checked at the route level, not just at trip endpoints. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `vehicleIdentificationNumber` | **schema.org** | `Vehicle` → literal | Canonical identity anchor |
| `denotes` | domain | `Identifier` → `Vehicle`/`SoftwareRelease` | Time-qualified — the fix for FLT-0231's reused fleet ID |
| `marketedAutomationLevel` / `operationalAutomationLevel` | domain, referencing **SAE J3016** via SKOS | `Vehicle` → `SAE-J3016-Level` | The former is static; the latter is a per-trip claim, not a second vehicle property |
| `hasResult` / `observedProperty` / `madeBySensor` / `madeByActor` | **W3C/OGC SOSA** | `Observation` → various | Base pattern for detection ranges, speed envelopes, seat occupancy |
| `wasAssociatedWith` / `qualifiedAttribution` | **W3C PROV-O** | `Observation`/`ASIL-Rating` claim → `Agent` | Keeps telemetry, safety-driver, and engineering-review determinations as separate, non-overwriting claims |
| `exactMatch` / `closeMatch` | **W3C SKOS** | area/identifier → area/identifier | `exactMatch` for the Build 4.12.2 / perception-v7.3.1 bundle (same artifact); `closeMatch` for genuinely-close area claims; no match property at all where a claim is disproven, not merely unverified |
| `requirementSatisfiedBy` / `requiresReverification` | domain | `SafetyRequirement` → `SoftwareRelease` | Re-verify-on-change, not a static pointer |
| `safetyDriverRequired` | domain | `Permit` → boolean | Policy rule, from permit conditions |
| `safetyDriverPresent` | domain, **SOSA**-observed | `SeatOccupancyObservation` → boolean | Observed fact, deliberately kept separate from the policy rule above |
| `regulatoryFilingOf` | domain | `Attribution` → boolean | Flags which of several attributed determinations was the one actually filed with a regulator |

## Worked instances

- **VIN 5YJOA1E26PF100111 / 5YJOA1E28PF100558** (`Vehicle`) — both `denoted` by fleet ID `FLT-0231`, at non-overlapping time ranges
- **Build 4.12.2 / perception-v7.3.1+planning-v2.9.0+control-v1.4.4** (`SoftwareRelease`) — two `Identifier`s, `skos:exactMatch`
- **INC-0442** (`DisengagementEvent`) — three `prov:Attribution`s (telemetry, safety driver, engineering review); engineering review's attribution carries `regulatoryFilingOf = true`
- **REQ-AV-014** — `requirementSatisfiedBy` → perception-v7.2.0, `requiresReverification = true` after perception-v7.3.1's detection-range change
- **REQ-AV-022** — two `ASIL-Rating` claims (ASIL-D from HA-2023-08, ASIL-C from the current supplier spec), both retained, neither preferred
- **Ashcombe Commons pickup point** — inside `MarketingServiceArea`, no match property to either `OperationalDesignDomain` or `PermitBoundary`; route to it produces a `PermitBoundaryExcursion`
- **FLT-0244** — `Permit.safetyDriverRequired = true`, but `SeatOccupancyObservation.safetyDriverPresent = false` on 12 of 20 recent trips
- **Arterial road class, Dunmore** — two `SpeedEnvelopeObservation`s for the same `FeatureOfInterest`: Mapping's 45 mph, Perception Engineering's 35 mph, kept as two results rather than reconciled

## Known gaps

- **`PermitBoundaryExcursion` has one worked instance (Ashcombe Commons/Colby Bridge).** No other
  route in the current source material has been checked at the segment level — the class and
  relation exist for when route-level checking is actually run fleet-wide, not as a proven
  fleet-wide pattern yet.
- **REQ-AV-022's ASIL disagreement is deliberately left unresolved**, not defaulted to either
  rating. The ontology's job here is to make the conflict blocking and visible, not to pick a
  number — resolving it for real requires a safety review this document can't substitute for.
- Full picture, including which conflicts have a worked example in `ontology.ttl` and which are
  class-only, is in the changelog.

# Autos / Autonomous Vehicles — Ontology Recipe

If you're an agent (Claude Code, Codex, or similar) that's been pointed at this page: this is your entrypoint. Read `../../shared/core/build.md` first for the general method, then come back here for what's specific to autonomous-vehicle-fleet ontologies.

**If the user has their own real source material** (fleet/telematics exports, disengagement or incident logs, ODD/geofence definitions, software release manifests, safety-case requirement registers, regulatory permit files), run the Build method against *those* files, not the demo material in `materials/` — that folder is a worked example, not your input. Ask the user where their files are before starting Discover, and what the ontology needs to be able to answer before that (Scope).

## Ground classes and relations in real ontologies, not invented vocabulary

No single published ontology covers autonomous-vehicle fleet operations end to end. For this domain, check these before inventing anything:

- **[schema.org's Vehicle](https://schema.org/Vehicle)** — `vehicleIdentificationNumber`, `manufacturer`, `vehicleModelDate`. The durable identity anchor; a fleet ID or telematics device ID is not the same thing as a VIN and shouldn't be modeled as one.
- **[W3C/OGC SOSA/SSN](https://www.w3.org/TR/vocab-ssn/)** — `Observation`, `Sensor`, `FeatureOfInterest`, `hasResult`, `observedProperty`, `madeBySensor`. The right base pattern for anything telemetry- or sensor-sourced: disengagement events, detection ranges, seat-occupancy, speed envelopes.
- **W3C PROV-O** — `wasRevisionOf`, `wasDerivedFrom`, `qualifiedAttribution`, `Agent`. For software build lineage and for keeping multiple parties' disagreeing determinations (telemetry vs. driver vs. engineering review) as separate, non-overwriting claims rather than one overwritten field.
- **W3C SKOS** — `exactMatch`/`closeMatch`/`broadMatch` for cross-reference confidence between area or identifier claims, *and* as the right way to represent two real external controlled vocabularies that aren't natively RDF: **SAE J3016**'s automation-level scale (L0–L5) and **ISO 26262**'s ASIL scale (QM/A/B/C/D). Model both as `skos:ConceptScheme`s, not free-text strings.
- **[ASAM OpenODD](https://www.asam.net/standards/detail/openodd/)** — the real published standard for describing an Operational Design Domain (road class × weather × speed, each independently validated). It's XML/schema-based, not RDF — borrow its condition-scoping pattern for a domain-specific `OperationalDesignDomain` class rather than claiming a native serialization that doesn't exist.

Only invent a domain-specific class or relation when you've checked these five and none fit — and say so explicitly, the way `PermitBoundary`, `MarketingServiceArea`, `Permit`, and `SoftwareRelease` are flagged as domain-specific in this vertical's output.

## What to expect in this domain

1. **Marketed automation level is not operational automation level.** A platform's certified maximum (what marketing and the spec sheet say) and what a specific vehicle is actually allowed to run on a specific trip (governed by which permit its metro holds) are two different claims. Don't collapse them into one vehicle property.

2. **Fleet/asset IDs get reused across physically different vehicles.** A chassis swap after a collision, a hardware refresh, a re-VIN'd unit — the fleet management system's ID often survives the swap even though the underlying VIN doesn't. Treat the fleet ID as an `Identifier` that `denotes` a VIN *at a point in time*, not as a standing alias.

3. **"Where the vehicle is allowed to operate" has at least three independent definitions**, usually owned by three different teams (mapping/validation, regulatory/legal, product/marketing) — and they will not agree, because none is derived from the others. Don't force them into one class; check each pairwise relationship for a genuine match before asserting one.

4. **A single safety-relevant event can have multiple, genuinely disagreeing determinations** — vehicle telemetry's automated flag, an onboard safety driver's account, and a post-hoc engineering review can all say something different about the same disengagement or incident. Regulatory reporting (e.g., NHTSA's Standing General Order) usually requires picking one for the filing — model that as an explicit flag on one attribution, not by discarding the others.

5. **Software release labels diverge between systems.** Fleet operations and engineering teams often version the same deployed artifact differently (a marketing-facing build number vs. a per-component version manifest). Check whether two labels denote the literally same thing before assuming they're different releases — or different things before assuming they're the same.

6. **A software change can silently break a downstream safety requirement.** Release-note templates are rarely built to flag "this changed a value a safety case depends on." Check every release for whether it touches a value referenced by a `requirementSatisfiedBy` link, and flag re-verification explicitly rather than trusting the release's own self-reported category.

7. **Safety ratings (ASIL, or similar) drift between the original hazard analysis and downstream component specs**, especially after a hardware or supplier redesign, often without a formal re-rating review. Keep both figures as dated, attributed claims — don't silently prefer the newer or the more conservative one.

8. **Policy defaults get conflated with observed facts.** A roster field or permit condition stating a safety driver is "required" is not the same claim as telemetry showing a driver was actually present on a given trip. Keep the rule and the observation as separate properties — this is usually the sharpest way to catch both over- and under-compliance.

## Suggested output

A class hierarchy plus a relation set, reusing schema.org/SOSA/SSN/PROV-O/SKOS wherever they fit (see above) — including using SKOS to represent SAE J3016 and ISO 26262 as queryable concept schemes rather than free-text fields. Serialize as Turtle/OWL if the user's tooling expects it — see `output/ontology.ttl` for a working example that actually parses — or plain markdown tables if not. Include the Validate-stage changelog so a safety or compliance reviewer can see which conflicts were resolved, which were deliberately left open pending human review (e.g. a genuine ASIL disagreement), and how, without re-reading every source doc.

## Demo walkthrough

See `stages/` for a worked example against the fictional company "Overland Autonomy" — an operator of the Ridgeline R4 autonomous vehicle platform running pilot service in two metros. Its fleet registry, disengagement/incident log, ODD/geofence register, software release log, safety-case requirements, and regulatory permit register all disagree with each other on purpose, to show what Resolve-stage decisions actually look like against real ontology vocabulary in a regulated, safety-critical domain.

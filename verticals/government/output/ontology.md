# Elmsworth County — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in the
[W3C Organization Ontology](https://www.w3.org/TR/vocab-org/) (ORG) and the
[Core Public Service Vocabulary Application Profile](https://semiceu.github.io/CPSV-AP/releases/3.0.0/)
(CPSV-AP, EU ISA² programme). See `../stages/03-resolve.html` for the reasoning behind each
choice, and `changelog.md` for a flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## A refinement found while writing this file

While preparing this output, a more precise real property emerged than what Draft/Resolve used:
ORG's `ChangeEvent` class — "represents an event which resulted in a major change to an
organization such as a merger or complete restructuring," a real subclass of **W3C PROV-O's
`Activity`** — with real `originalOrganization`/`resultingOrganization` properties. This models
the 2024 reorg itself as a first-class instance, not just a relation update, and is used below in
place of the plainer description in Resolve. Same "catch a better real fit during the output
pass, disclose it" discipline as media's payAmount/percentage correction.

## Classes

| Class | Source | Definition |
|---|---|---|
| `Organization` | **W3C ORG** | The county government itself — parent of every `OrganizationalUnit`. |
| `OrganizationalUnit` | **W3C ORG** | A department or support unit within a larger organization. |
| `ChangeEvent` | **W3C ORG** | A major organizational change (merger, restructuring) — subclass of **PROV-O's `Activity`**. |
| `PublicService` | **CPSV-AP** | A service performed by or on behalf of a public organisation. |
| `Rule` | **CPSV-AP** | The document setting out a service's procedures, including fees. |
| `Requirement` / `Evidence` | **CPSV-AP** | Deliberately distinct — a condition, and what proves it. |
| `Cost` | **CPSV-AP** | What a service costs the consuming Agent. |
| `LifeEvent` / `BusinessEvent` | **CPSV-AP** | Two distinct real trigger-event classes. |
| `NavigationCategory` | domain | The website's "Department" meaning — many-to-many linked to `OrganizationalUnit`, not a synonym for it. |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `hasCompetentAuthority` | **CPSV-AP** | `PublicService` → `PublicOrganisation` | Updated to the correct org after the reorg (Conflict 3) |
| `originalOrganization` / `resultingOrganization` | **W3C ORG** | `ChangeEvent` | The precise real link for the 2024 reorg (Conflict 3) |
| `holdsRequirement` | **CPSV-AP** | `PublicService` → `Requirement` | Real property name (Conflict 4) |
| `hasSubOrganization` / `subOrganizationOf` | **W3C ORG** | `Organization` | Elmsworth County → both departments (Conflict 3) |
| `supportsRequirement` | **CPSV-AP** | `Evidence` → `Requirement` | Both evidence instances point to the residency requirement (Conflict 4) |
| `channelRequirementVariance` | domain | `Channel` (boolean) | (Conflict 1) |
| `stateRegistryId` / `federalGrantId` | domain | `OrganizationalUnit` (string) | Independent identifiers, kept separate rather than merged (Conflict 2) |
| `linkedToCategory` | domain | `OrganizationalUnit` → `NavigationCategory` | Many-to-many link (Conflict 6) |
| `lastGenerated` | domain | `Rule` document (date) | (Conflict 7) |
| `reconcilesCompetentAuthorityAndCost` | domain | review checkpoint (boolean) | (Conflict 9) |

## Worked instances

- **SVC-2201 / SVC-2201-ON** — one `PublicService`, two `Channel`s; online flagged `channelRequirementVariance: true`
- **ORG-COMM-04 / ORG-ECON-01** — both real `subOrganizationOf` Elmsworth County Government; independent `stateRegistryId`s, only ORG-COMM-04 has a `federalGrantId` (missing one left absent, not inferred)
- **Reorg2024** (`ChangeEvent`, a real **PROV-O `Activity`**) — `originalOrganization` ORG-COMM-04, `resultingOrganization` ORG-ECON-01
- **SVC-2201 / SVC-2201-ON** — `hasCompetentAuthority` now ORG-ECON-01
- **Residency `Requirement`** — two `Evidence` instances (utility bill, lease agreement)
- **Rule document (fee schedule)** — `lastGenerated: 2022`, flagged stale against the 2025 Board-approved increase
- **Review checkpoint** — `reconcilesCompetentAuthorityAndCost: false`
- **Two `ProcessingTimeClaim`s** — published (5 days) and actual, renewal season (11 days)

## Known gaps

- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

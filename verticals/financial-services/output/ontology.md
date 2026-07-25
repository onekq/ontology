# Kestrel Bank — Resolved Ontology

Output of the Build method applied to `materials/`, grounded in
[FIBO](https://github.com/edmcouncil/fibo) (Financial Industry Business Ontology, EDM Council)
plus W3C PROV-O for audit trail. See `../stages/03-resolve.html` for the reasoning behind each
choice, and `changelog.md` for a flat list of what was decided. Machine-readable: [`ontology.ttl`](ontology.ttl).

## Classes

| Class | Source | Definition |
|---|---|---|
| `LegalEntity` / `LegalPerson` | **FIBO** | A person (natural or organizational) recognized by law as having rights and obligations. |
| `LegalEntityIdentifier` | **FIBO** | "An organization identifier that uniquely identifies a legal person as defined in ISO 17442" — the real LEI standard. |
| `LegallyCompetentNaturalPerson` | **FIBO** | An individual with legal capacity. |
| `EntityLegalForm` | **FIBO** | A jurisdiction-recognized legal form, identified per ISO 20275. |
| `SpecialPurposeVehicle` | **FIBO** | A pass-through vehicle — used for Bramwell specifically to make "an SPV with no traced ultimate owner" a queryable pattern. |
| `AccountRelationship` | domain | A Relationship Manager's serviced account — distinct from `LegalEntity` identity (Conflict 1). |
| `ProspectContact` | domain | A CRM contact not yet KYC-complete — promoted to `LegalPerson` once screening finishes (Conflict 6). |
| `RateRecord` | domain | An interest-rate figure with its own effective-date range — FIBO's rate/pricing modules weren't researched deeply enough to ground this one; domain vocabulary used deliberately instead of guessed (Conflict 7). |

## Relations

| Relation | Source | Domain → Range | Notes |
|---|---|---|---|
| `hasOwnershipPercentage` | **FIBO** | ownership record | Direct quote: "the percentage ownership interest... if known" |
| `isDirectlyConsolidatedBy` | **FIBO** | `LegalEntity` → `LegalEntity` | Asserted: Bramwell → Larkspur |
| `isUltimatelyConsolidatedBy` | **FIBO** | `LegalEntity` → `LegalEntity` | **Deliberately not asserted** for Bramwell's controllers — genuinely unknown, not filled in (Conflict 3) |
| `hasLegalForm` | **FIBO** | `LegalEntity` → `EntityLegalForm` | Modeled with effective dates, not a single mutable field (Conflict 4) |
| `wasRevisionOf` | **W3C PROV-O** | `EntityLegalForm` → `EntityLegalForm` | Nevada record → Delaware record (Conflict 4) |
| `identifierCompleteness` | domain | `LegalEntity` | Flags genuinely absent LEI/Tax ID rather than inferring them |
| `wasAssociatedWith` / `endedAtTime` | **W3C PROV-O** | approval `Activity` | Replaces a free-text approval note with structured, queryable provenance (Conflict 8) |
| `reverifiesBeneficialOwnership` | domain | refresh checkpoint (boolean) | `false` — the checkpoint's name implies more than it checks (Conflict 9) |

## Worked instances

- **Larkspur Holdings LLC** (`LegalEntity`) — `isDirectlyConsolidatedBy` ← Bramwell Capital Partners LP (60%), Marcus Feld (25%), Sonia Feld (15%); two `hasLegalForm`/jurisdiction records (Delaware, effective 2019; Nevada, effective 2024)
- **Bramwell Capital Partners LP** (`SpecialPurposeVehicle`) — no `isUltimatelyConsolidatedBy` asserted; the gap itself is the point
- **Loan KB-88291** — two `RateRecord`s (7.25% open-ended; 6.85% for 2023-06-01 through 2023-12-31), kept distinct
- **Approval `Activity`** — `wasAssociatedWith` the approver, `endedAtTime` the decision timestamp
- **KYC refresh checkpoint** — `reverifiesBeneficialOwnership: false`
- **Two risk assessments** — Compliance's "Low" rating and Transaction Monitoring's unreviewed elevated-activity flag, kept as separate, timestamped instances

## Known gaps

- **`isUltimatelyConsolidatedBy` is intentionally absent for Bramwell** — this is the central finding of the whole vertical, not an oversight to fix later. A future update should add it only once Kestrel's compliance team actually identifies Bramwell's controlling individuals.
- Full picture, including which conflicts have a worked example in `ontology.ttl`, is in the changelog.

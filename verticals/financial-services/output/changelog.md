# Resolution Changelog — Kestrel Bank

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | No instance needed — resolved by Conflict 1's split, not a new one |
| 6 | 6 | Yes |
| 7 | 7 | Yes |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **Customer ID ambiguity** resolved by keeping **FIBO's `LegalEntity`/`LegalPerson`** as the identity, with a new domain `AccountRelationship` for the Relationship Manager's book of accounts — same shape as retail's SKU/Offering split.
2. **LEI/Tax ID/internal ID independence** kept as separate properties — FIBO itself doesn't require an LEI for every legal person. Genuinely missing identifiers flagged with `identifierCompleteness`, not inferred.
3. **Larkspur's beneficial ownership** resolved by asserting **FIBO's `isDirectlyConsolidatedBy`** for the known Bramwell → Larkspur link, and deliberately *not* asserting **`isUltimatelyConsolidatedBy`** for anyone — the gap is genuine and stays visible. Bramwell classified as a **FIBO `SpecialPurposeVehicle`** specifically to make "an SPV with no traced ultimate owner" a queryable pattern, not a silent one.
4. **Larkspur's jurisdiction** modeled as two point-in-time `EntityLegalForm` records (Delaware 2019, Nevada 2024) linked by **PROV-O's `wasRevisionOf`**, rather than one field silently overwritten.
5. **"Relationship"** required no new work — Conflict 1's `AccountRelationship`/`LegalEntity` split already separates Relationship Management's meaning from Compliance's ownership-link meaning.
6. **"Party"** resolved with a domain `ProspectContact` class, promoted to **FIBO's `LegalPerson`** only once KYC and screening complete — FIBO's own notion of a legal person already implies a real, identified entity.
7. **RATE-1/RATE-2 overlap** kept as two domain `RateRecord` instances — FIBO's rate/pricing modules weren't researched deeply enough to ground this one; domain vocabulary used deliberately rather than guessed, same honest fallback as manufacturing's `alternativeTo` and retail's `DeliveryEstimate`.
8. **Loan approval audit trail** modeled as a **W3C PROV-O `Activity`** with `wasAssociatedWith` and `endedAtTime` — replacing a free-text convention with real, structured, queryable provenance.
9. **KYC refresh checkpoint gap** flagged with a domain `reverifiesBeneficialOwnership: false` property — same pattern as manufacturing's QC checkpoint and retail's returns inspection.
10. **Risk rating vs. transaction monitoring** kept as two separate, timestamped assessments rather than reconciled — the disagreement itself is the fact worth preserving.

**One item was explicitly logged as not resolved separately**, not silently dropped: REQ-201 (folded into #3 — same "direct vs. ultimate ownership" gap, viewed from the policy side). See Stage 4 (Validate) for the full trace.

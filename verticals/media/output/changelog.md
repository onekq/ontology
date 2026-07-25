# Resolution Changelog — Amberlane Media

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).
Vocabulary in **bold** is from a real published ontology, not invented for this project.

| # | Resolve conflict | In ontology.ttl? |
|---|---|---|
| 1 | 1 | Yes |
| 2 | 2 | Yes |
| 3 | 3 | Yes |
| 4 | 4 | Yes |
| 5 | 5 | Yes |
| 6 | 6 | Yes |
| 7 | 7 | Yes |
| 8 | 8 | Yes |
| 9 | 9 | Yes |
| 10 | 10 | Yes |

1. **"License" ambiguity** resolved with **ODRL's real `Offer`/`Agreement`** distinction — Sales' meaning stays an Offer until countersignature, matching Legal's own definition precisely.
2. **Asset ID / syndication ID / creator catalog # independence** kept as separate identifiers (domain `syndicationId`/`creatorCatalogNo`, plus the ODRL asset URI itself) — ODRL doesn't require any particular identifier scheme; genuinely missing ones (AMB-40013's syndication ID) left absent, not inferred.
3. **Permission granted without checking an active Prohibition** resolved by asserting **both `odrl:Permission` and `odrl:Prohibition`** on the same asset, flagged `conflictsWithProhibition: true` — ODRL allows this on purpose, since real rights conflicts often need human review, not an automated rule.
4. **"Sold" vs. signed "license" terms** resolved using **ODRL's real semantic distinction**: `sell`/`give` delete the original asset; `license`/`use` don't. The real action (`license`) was asserted, with a domain flag for the internal-label mismatch.
5. **timeInterval drift** resolved by treating rights-management as canonical and billing's copy as a derived, `lastSynced`-flagged record — a genuinely different shape than "keep both, don't reconcile," since here one system really is the source of truth.
6. **Spatial constraint violation** resolved with a domain `UsageEvent`, flagged `withinSpatialConstraint: false` — makes a one-off audit finding a permanent, queryable fact.
7. **Missing compliance-check mechanism** (distinct from #6's specific violation) flagged with a domain `hasScheduledComplianceCheck: false` on the Policy itself.
8. **Attribution duty never verified** — kept **ODRL's real `Duty`** (action `attribute`), added a domain `dutyFulfillmentVerified: false` flag, same checkpoint-gap pattern as every prior vertical.
9. **Studio A double-booked** resolved as two **`odrl:use` Permissions** with overlapping real `odrl:constraint` (`timeInterval`) — deliberately not a fabricated "lease" action, since ODRL's real vocabulary has none.
10. **Royalty percentage disagreement** resolved the same way as #5: the countersigned contract's real `odrl:constraint` (`percentage eq 15`) is canonical; Finance's figure modeled as a divergence-flaggable domain `PaymentRecord`.

**One item was explicitly logged as not resolved separately**: REQ-403 (folded into #10 — same Finance-vs-contract discrepancy). See Stage 4 (Validate) for the full trace.

## A correction made during this pass

`payAmount`/`percentage` were initially modeled as bare literal properties directly on `Duty` (e.g. `odrl:payAmount "15"`). On review, this misrepresented ODRL's real structure — these are **Constraint left-operands**, meant to appear inside an `odrl:constraint` blank node with `leftOperand`/`operator`/`rightOperand`, not as standalone properties. Fixed before publishing, the same cross-check discipline applied to every prior vertical's output.

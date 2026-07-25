# Regulatory Filing & Documentation Requirements Register (excerpt)

Maintained by Compliance. Each requirement has a "Satisfied by" field set once and rarely
revisited.

## REQ-601 — Filing approval before effect
> A plan's rates and cost-sharing terms may not be billed as effective until the corresponding
> SERFF filing shows status "Approved," not merely "Filed."

**Satisfied by:** the SERFF tracking number existing in the plan registry.

The registry records a tracking number as soon as a filing is submitted — it does not distinguish
"Filed" from "Approved." Thistlebrook Bronze PPO (89432CA0030001) has no tracking number at all
yet and is already being quoted by Sales.

## REQ-602 — Formulary synchronization
> The plan's official formulary tier for each drug must match the Pharmacy Benefit Manager's
> current billing tier.

**Satisfied by:** the formulary record created at plan-year setup.

Nothing re-runs this check when the PBM changes a drug's tier mid-year, as happened with
Atorvastatin.

## REQ-603 — Marketing material currency
> Posted plan brochures and summaries must reflect the plan's current approved rates and
> cost-sharing terms.

**Satisfied by:** the brochure generation step run at initial plan-year setup.

Nothing re-runs this step when a rate change is later approved mid-cycle.

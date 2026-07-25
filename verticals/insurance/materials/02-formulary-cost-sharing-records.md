# Formulary & Cost-Sharing Records — Thistlebrook Gold PPO (89432CA0010001)

## Formulary drug tier — Atorvastatin (generic)

| System | Tier |
|---|---|
| Thistlebrook's official HealthPlanFormulary record | Tier 2 (lower copay) |
| Pharmacy Benefit Manager's (Meridian Rx) own system | Tier 3 (higher copay) — updated after a 2025 supplier contract change |

Thistlebrook's formulary record was never updated after Meridian Rx's tier change. Members are
being told Tier 2 pricing when they check the plan's official documents, but billed at Tier 3 at
the pharmacy counter.

## Coinsurance timing — Outpatient physical therapy

Plan cost-sharing specification: coinsurance for outpatient physical therapy applies **after**
the deductible is met (`healthPlanCoinsuranceOption: after deductible`).

Claims-processing system default: for this specific service category, the system was configured
to apply coinsurance **before** deductible — a configuration error introduced when the category
was added in 2023 and never caught, since most affected members hadn't yet met their deductible
when the claims were processed.

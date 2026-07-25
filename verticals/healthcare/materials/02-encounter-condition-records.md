# Encounter & Condition Records

## Encounters

| Encounter ID | Patient MRN | Status | Period start | Period end | Notes |
|---|---|---|---|---|---|
| ENC-5001 | MRN-100234 (Dana Osei) | in-progress | 2024-01-10 | *(not set)* | Never closed out — clinically finished weeks ago per the chart, but nothing marked it complete. |
| ENC-5002 | MRN-100891 (Dana Ossei) | finished | 2023-11-03 | 2023-11-03 | The ER visit that created the duplicate record. |

## Conditions

| Condition ID | Patient MRN | ICD-10 code | Clinical code | Clinical status | Verification status | Notes |
|---|---|---|---|---|---|---|
| COND-8801 | MRN-100234 (Dana Osei) | E11.9 (Type 2 diabetes, unspecified) | DM2-STD-1994 (clinical terminology mapping, last synced 2019) | active | confirmed | Control example — no conflict. |
| COND-8802 | MRN-100891 (Dana Ossei) | I10 (essential hypertension) | HTN-STD-1994 | active | **entered-in-error** | Diagnosis was a documentation mistake — flagged `entered-in-error` by the original clinician. The downstream population-health reporting system reads only `clinical_status` and currently counts this patient as having active hypertension. |

Note on COND-8801's clinical code: the ICD-10 code (E11.9) has been updated in national coding
guidance since 2019 to distinguish diabetes sub-types more precisely; the clinical terminology
mapping was never re-synced and now represents a broader, less specific concept than the current
ICD-10 code does.

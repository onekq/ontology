# Allergy & Medication Change Log

## AllergyIntolerance records

| Record | Patient MRN | Substance | Criticality | Verification status | Recorded |
|---|---|---|---|---|---|
| ALG-201 | MRN-100234 (Dana Osei) | Penicillin | high | confirmed | 2019-06-02 |
| — | MRN-100891 (Dana Ossei) | *(none on file)* | — | — | — |

MRN-100891 has no allergy records at all — allergy history wasn't asked about (or wasn't found)
during the 2023 ER registration, since staff had no way to know it was the same patient as
MRN-100234. Because MRN-100891 has had more recent activity, some downstream systems treat it as
the "current" record for Dana Osei/Ossei — meaning the Penicillin allergy effectively disappears
from view for anyone querying the more recently active record.

## Medication changes (MRN-100234)

- 2019-06-02 — Amoxicillin discontinued after the Penicillin allergy was identified (cross-reactive
  risk).
- 2022-03-11 — Lisinopril started for blood pressure management.

No corresponding medication history exists on MRN-100891.

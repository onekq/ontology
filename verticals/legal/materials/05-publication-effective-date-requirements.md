# Publication & Effective Date Requirements Register (excerpt)

Maintained by the City Attorney's office. Each requirement has a "Satisfied by" field set once
and rarely revisited.

## REQ-501 — Complete lifecycle record
> Every ordinance's lifecycle record must list every event that has affected it — enactment,
> amendment, and repeal — with dates and references to the amending/repealing instrument.

**Satisfied by:** the lifecycle entry created at enactment.

CLK-2019-014's lifecycle record has only its own enactment event. Ordinance 2023-07's amendment
was never added to it.

## REQ-502 — Effective date public notice
> The public must be able to determine an ordinance's legally effective date, which may differ
> from its passage date or publication date per state law's mandatory waiting period.

**Satisfied by:** the "enacted_date" field in the ordinance registry.

The registry's single date field does not distinguish passed, published, and effective dates.
For ordinances subject to the waiting period, "enacted_date" as recorded may not be the date the
ordinance actually took legal effect.

## REQ-503 — Manifestation matches current Expression
> Any publicly posted rendering of an ordinance must reflect its current, amended text.

**Satisfied by:** the PDF generation step run at initial codification.

Nothing re-runs this step when a later amendment changes the underlying text — see the
Manifestation drift already found for TMC 14.20.030.

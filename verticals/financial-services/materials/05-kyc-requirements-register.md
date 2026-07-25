# KYC & Compliance Requirements Register (excerpt)

Maintained by Compliance. Each requirement has a "Satisfied by" field set at policy creation and
rarely revisited.

## REQ-201 — Beneficial ownership identification
> Any individual or entity with 25% or greater effective ownership of a borrower must be
> identified and screened.

**Satisfied by:** the Beneficial Ownership File's direct-ownership records.

For Larkspur Holdings LLC, this stops at Bramwell Capital Partners LP (60%, direct) — Bramwell's
own controlling individuals, who hold the *effective* 60% stake in Larkspur, were never
identified. The requirement is satisfied for the direct layer and unmet for the effective one.

## REQ-202 — Approval audit trail
> Every loan approval decision must record who approved it and when, in a queryable field.

**Satisfied by:** the loan approval record's `status` field.

In practice, approver identity and timestamp are recorded only in a free-text `notes` field
("Approved by J. Whitcombe 3/14"), not in structured, queryable fields — satisfying the letter
of the requirement for a human reading the note, not for any system checking it.

## REQ-203 — Annual KYC refresh
> Every business borrower's KYC file must be refreshed annually, including a re-check of
> beneficial ownership.

**Satisfied by:** the annual refresh checklist's "confirm still operating" checkpoint.

That checkpoint confirms the business is still active — it does not re-verify beneficial
ownership. Larkspur's file has been "refreshed" annually since 2019 without the underlying
Bramwell gap ever being caught by the process meant to catch exactly this.

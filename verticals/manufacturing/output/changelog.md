# Resolution Changelog — Cairn Drivetrain Co.

Each entry settles one conflict logged in Stage 1 (Discover) and resolved in Stage 3 (Resolve).

1. **MTR-100R** modeled as its own `Product` with `derivedFrom` MTR-100, not as a child part — it diverges in spec (rotor revision) and has an independent revision history.
2. **`supersedes`** made a scoped relation (via `shippingContext`), not a global one — Rev B and Rev C ship concurrently in different contexts, so a strict linear chain would misrepresent reality.
3. **FST-004 cross-references** kept as three separate `SupplierCrossReference` instances rather than collapsed into one equivalence — two are flagged `unverified-equivalent` pending engineering sign-off, preserving the wrong-head-type and length-mismatch problems instead of hiding them.
4. **FST-004 / FST-004-2** kept as two distinct `Part` instances related by `alternativeTo` — different coating for different use contexts, not a straight supersession.
5. **"Assembly"** split into `StructuralAssembly` and `PurchasedKit` rather than merged into one class — Engineering's and Procurement's meanings genuinely diverge (STA-200 is the former, not the latter).
6. **"Controller"** resolved to `MotorControlUnit` (matching current engineering drawings), with `ControllerBoardAssembly` kept as a deprecated alias for ERP lookups. No class created for the QA job role — out of scope for a parts ontology.
7. **"Housing"** split into unrelated `MotorHousing` and `ShippingContainer` classes — no legitimate overlap case, purely a vocabulary collision.

**Nothing from the Discover inventory was silently dropped** — see Stage 4 (Validate) for the full term-by-term trace.

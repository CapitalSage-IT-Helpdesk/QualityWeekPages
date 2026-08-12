# Capital Sage Quality Week awareness pages

Public, full-screen GitHub Pages for the five supplied Quality Week awareness images.

- `/today/` — Permanent browser-policy URL; GitHub Actions selects the daily image

- `/day-1/` — Quality Week plan, goals and objectives
- `/day-2/` — Quality and food safety rules
- `/day-3/` — Distributor warehouse golden rules
- `/day-4/` — Retail assessment golden rules
- `/day-5/` — Group Quality Slogan: One Team, One Standard, Zero Compromise

The daily pages use `object-fit: contain` so the complete 16:9 artwork remains visible without cropping.

The `Rotate Quality Week Daily Page` workflow publishes Days 1–5 from August
10–14, retains Day 5 through the weekend, resets to Day 1 at 18:17 WAT on
Sunday August 16, and publishes Days 1–5 again from August 17–21. After the
final Day 5 update, the workflow disables its schedule permanently. It can also
be run manually with an explicit day. The browser URL never changes.

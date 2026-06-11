# RiskAtlas Progress

Last updated: 2026-06-12

## Goal

Build a private insurance portfolio management system where each user:

- creates an account with an enforced minimum age of 18
- imports CSV data for policies, incidents, and claims
- creates portfolios from filter criteria
- explores each portfolio in a dashboard with totals, trends, and distributions

## What Is Already Done

- A Next.js 16 app is in place with the App Router structure.
- Supabase authentication is wired for:
  - sign up
  - sign in
  - sign out
  - current-user detection on server-rendered pages
- The sign-up flow already validates the birth date and blocks users younger than 18.
- Public landing, sign-in, sign-up, and protected dashboard pages already exist.
- The UI foundation uses Tailwind CSS and shadcn-style primitives.
- The app already has a branded visual direction and a protected dashboard shell.
- The first CSV import foundation has been added:
  - a machine-readable insurance group 39 lookup set
  - a CSV parser for the sample insurance claims file
  - a mapper that derives `_c39`
  - a Drizzle schema for imports, portfolios, and claim records
  - an initial import service that parses and inserts CSV rows
- The first database migration has been generated.
- The initial CSV upload page and portfolio setup page are in place.
- The import page now includes:
  - strict header validation for the reviewer CSV format
  - clear validation errors with details
  - a downloadable CSV template for non-technical users
- Row-level security policies have been prepared and applied for the main user-owned tables.
- The app now scopes database work through a user-context transaction helper so reads and writes stay tied to the signed-in user.
- The portfolio setup page now uses real dropdown/search controls and saves portfolio definitions per user.
- The dashboard now reads saved portfolios, defaults to the first saved group, and shows the first analytics cards/charts for the selected portfolio.
- The dashboard trend charts now show monthly and yearly claim evolution, plus distribution cards for state, gender, and makes.
- The current UI direction is intentionally minimalistic and aimed at non-technical insurance reviewers.

## What Is Not Done Yet

- The data model is still a vertical-slice schema, not a fully normalized production model split into separate users, uploads, policies, incidents, and claims tables.
- No upload storage flow exists yet for persisting source CSVs.
- No deeper analytics beyond the first totals/charts layer has been built yet.
- No admin or review tooling exists yet for monitoring imports and user data quality.

## CSV Format Confirmed

The first supported import format will be the provided `insurance_claims.csv` sample.

- The import should accept the source columns as provided in the sample file.
- `_c39` is present in the header but empty in the source data.
- During import, `_c39` should be derived as a boolean-style flag:
  - `Y` if the vehicle belongs to insurance group 39
  - `N` if it does not
- The group-39 determination will be based on the vehicle `auto_make` and `auto_model`.
- The authoritative reference for the group-39 lookup is:
  - [Page 1](https://www.carinsurancegroups.co.uk/insurance-groups/group-39/)
  - [Page 2](https://www.carinsurancegroups.co.uk/insurance-groups/group-39/page-2/)
  - [Page 3](https://www.carinsurancegroups.co.uk/insurance-groups/group-39/page-3/)
  - [Page 4](https://www.carinsurancegroups.co.uk/insurance-groups/group-39/page-4/)

## Recommended Next Steps

1. Decide whether to normalize the data model further.
   - Split or keep the current vertical-slice tables for imports, claims, and portfolios.
   - Confirm which fields must remain first-class in the schema.
   - Decide whether cached aggregates are needed later.

2. Optional: add source-file storage for imports.
   - Persist uploaded CSVs instead of only parsing them in memory.
   - Keep the reviewer template and validation flow intact.
   - Add a clearer import history story for non-technical users.

3. Extend analytics beyond the first dashboard slice.
   - Add richer trend views and more distribution breakdowns if they help reviewers.
   - Keep the chart set simple and readable.
   - Favor insights that help an insurance agent interpret the portfolio quickly.

4. Add QA and deployment checks.
   - Validate the flow locally.
   - Confirm Vercel/Supabase environment variables and production readiness.

## Open Questions

- Should imports be synchronous for small files and asynchronous for larger ones?
- Do portfolios store only the filter definition, or also cached aggregates?
- Which fields are mandatory in the first version of the dashboard?
- Should the first dashboard stay claims-only, or also introduce policy-level views later?

## Working Log

- 2026-06-11: Inspected the current repo state and documented the baseline.
- 2026-06-11: Created branch `feature/portfolio-platform-foundation`.
- 2026-06-11: Added this progress tracker to keep the work organized.
- 2026-06-11: Confirmed the first CSV import format and noted the derived `_c39` rule.
- 2026-06-11: Captured the four insurance group 39 reference pages for make/model mapping.
- 2026-06-11: Implemented the first CSV parsing/mapping layer, Drizzle schema, and import service.
- 2026-06-11: Generated the first Drizzle migration and added the CSV import and portfolio setup screens.
- 2026-06-11: Added strict CSV header validation, friendly import errors, and a downloadable template.
- 2026-06-11: Added row-level security SQL, authenticated user-context helpers, and saved portfolio listing.
- 2026-06-11: Added dashboard portfolio selection and the first filtered analytics cards/charts.
- 2026-06-12: Updated the dashboard trend charts to use monthly and yearly analytics for better alignment with the brief.
- 2026-06-12: Added a runtime guard to the user-context helper so scoped database work cannot run without a signed-in user id.
- 2026-06-12: Refreshed this tracker so it reflects the current vertical slice and the remaining product gaps more accurately.
- 2026-06-12: Removed dashboard URL state and made the first saved group the default local selection.
- 2026-06-12: Added a claim-value mix pie chart for injury, property, and vehicle claim composition.

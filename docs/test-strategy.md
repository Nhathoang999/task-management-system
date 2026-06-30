# Test Strategy Document
**Project Name**: Task Management Web Application
**Document Version**: 1.0

## 1. Objective
The objective of this Test Strategy is to define the testing methodology for the Task Management Application. It serves as a guide for the QA team to ensure a structured, repeatable, and scalable testing process.

## 2. Testing Methodology
We follow a hybrid Agile testing methodology. Testing runs parallel to development, with Automated tests serving as regression safeguards, while Manual testing focuses on exploratory edge cases and UX validation.

## 3. Test Design Techniques
To maximize test coverage and minimize redundancy, the following black-box test design techniques will be employed:
- **Equivalence Partitioning (EP)**: Used for input fields like Task Title (length) and Priority dropdowns.
- **Boundary Value Analysis (BVA)**: Used for date fields (Past Due Date, Today, Future Date) and string limits.
- **Error Guessing**: Relying on QA experience to predict failure points (e.g., submitting empty forms, SQL injection attempts, XSS).

## 4. Automation Framework Architecture
- **Language**: TypeScript
- **Framework**: Playwright Test
- **Design Pattern**: Page Object Model (POM)
  - `BasePage.ts`: Common interactions (click, fill, wait).
  - Specific Pages: `LoginPage.ts`, `DashboardPage.ts`.
- **Data Driven**: Test data is decoupled and stored in `test-data/` (valid, invalid, boundary).

## 5. Categorization and Execution
Automated tests are categorized using tags for targeted execution:
- `@smoke`: Critical path validation (Login -> Create Task -> Search). Executed on every minor deployment.
- `@regression`: Full suite execution. Triggered nightly or before major releases.
- `@validation`: Form validations and negative scenarios.

## 6. Environment Strategy
- Development and Local testing utilize an isolated SQLite database (`sql_app.db`).
- The automation framework will reset the database state before executing regression suites to avoid data pollution.

## 7. Metrics & Reporting
- Test Pass/Fail Rate
- Automation Coverage
- Defect Density
- Reports will be generated via Playwright HTML Reporter and published to GitHub Actions artifacts.

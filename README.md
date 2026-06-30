# Enterprise UI Test Automation Portfolio

![Playwright HTML Report Mockup](https://raw.githubusercontent.com/microsoft/playwright/main/docs/src/img/html-reporter.png)

## Overview
This repository serves as a **Enterprise UI Test Automation Portfolio**. It demonstrates a transition from a basic CRUD application into a fully automated, CI/CD integrated, and professionally documented quality assurance project. 

The core application is a Task Management System, but the primary focus of this repo is the **QA Architecture**, **Playwright Automation Framework (POM)**, and **Manual Testing Artifacts**.

## Project Architecture & Tech Stack
- **Frontend**: React, Material-UI, Vite
- **Backend**: FastAPI, SQLite, Python 3.11
- **Automation**: Playwright (TypeScript)
- **CI/CD**: GitHub Actions
- **AI Integration**: Google Gemini API (for Test Case Review)

## Project Structure
```text
task-management-testing/
├── backend/                  # FastAPI Application
├── frontend/                 # React UI Application
├── playwright/               # E2E Automation Framework
│   ├── pages/                # Page Object Model (POM)
│   │   ├── BasePage.ts       # Shared logic (click, fill, screenshot)
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   └── TaskPage.ts
│   ├── tests/                # Spec files organized by category
│   │   ├── login.spec.ts
│   │   ├── task-crud.spec.ts
│   │   ├── search-filter.spec.ts
│   │   ├── validation.spec.ts
│   │   └── regression.spec.ts
│   └── test-data/            # Decoupled JSON data (valid, invalid, boundary)
├── docs/                     # Test Plan, Strategy, Release Checklist
├── artifacts/                # Manual Test Cases (.xlsx), RTM
├── reports/                  # QA Dashboard & Playwright HTML outputs
├── bugs/                     # Detailed Bug Reports (Severity/Priority)
├── screenshots/              # Visual Evidence
├── ai/                       # AI-Assisted Testing Scripts (Gemini Review)
└── .github/workflows/        # CI/CD Pipelines
```

## Quick Start
### 1. Run the Application
Start both frontend and backend locally to ensure the environment is ready for automation.
```bash
# Start Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Start Frontend
cd frontend
npm install
npm run dev
```

### 2. Run Playwright Automation
The automation suite uses Page Object Model and categorizes tests using tags.
```bash
cd playwright
npm install
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run Smoke Tests only
npx playwright test --grep @smoke

# Run Regression Tests only
npx playwright test --grep @regression

# View the HTML Report
npx playwright show-report
```

## QA Workflow & Best Practices
This project embodies industry-standard QA methodologies:
1. **Test Design**: Black-box techniques (Equivalence Partitioning, Boundary Value Analysis) used in `test-cases.xlsx`.
2. **Page Object Model (POM)**: High maintainability by abstracting UI locators into classes (`BasePage.ts`).
3. **Decoupled Test Data**: JSON fixtures in `test-data/` to keep specs clean.
4. **Defect Lifecycle**: Documented bugs in `bugs/` with clear Reproduction Steps, Expected/Actual Results, and Root Cause analysis.
5. **Continuous Testing (CI)**: `playwright.yml` GitHub Action triggers on every push/PR to run the full suite and upload HTML reports.

## Exposure to AI-Assisted Testing
To keep up with modern QA trends, this repository includes an `ai/` module.
Instead of heavily relying on AI to blindly generate tests, a Python script uses the **Gemini API** to read the existing manual test cases and suggest **missing edge cases** (e.g., missed boundary values or negative XSS scenarios). QA engineers then review and accept/reject these suggestions. 

See `ai/review-result.md` for a demonstration of this workflow.

## Playwright HTML Report
The execution generates a professional HTML report containing:
- PASS / FAIL metrics
- Test Duration
- Traces and Screenshots on failure

*(An artifact is automatically uploaded to GitHub Actions on every run).*

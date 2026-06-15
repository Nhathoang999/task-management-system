<div align="center">
  <h1> Task Management Testing System</h1>
  <p><i>A full-stack Task Management Web Application developed for QA and Software Testing practice.</i></p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
  [![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
  [![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
</div>

<br />

## 1.  Project Overview

The **Task Management Testing System** is a complete, production-ready Full-Stack application intentionally designed and built to serve as a comprehensive playground for **Quality Assurance (QA)**, **Software Testing**, and **Test Automation**. 

Unlike generic tutorials, this project simulates a real-world software development lifecycle. It includes standard CRUD operations, JWT authentication, UI component states, and intentionally crafted defects. The repository showcases end-to-end testing capabilities, test planning, defect management, and automated CI/CD pipelines—making it a perfect portfolio project for showcasing SDET (Software Development Engineer in Test) and QA Engineer competencies.

---

## 2.  System Architecture

The application follows a modern decoupled architecture:
*   **Frontend Client:** A Single Page Application (SPA) built with React and Material UI, functioning as the primary user interface.
*   **Backend API:** A RESTful API built with Python and FastAPI, handling business logic and secure JWT authentication.
*   **Database:** SQLite integrated with SQLAlchemy ORM for reliable, lightweight data persistence.
*   **Testing Automation:** Playwright E2E framework validating user journeys directly against the fully integrated system.

---

## 3.  Features

The application supports the following core user flows, serving as the basis for all Test Cases:

*    **User Security:** Register, Login, and Logout functionality using secure JWT tokens.
*    **Task Lifecycle:** Create Task, Edit Task, and Delete Task (CRUD).
*    **Advanced Search:** Case-insensitive search by Task Title.
*    **Dynamic Filtering:** Filter tasks by `Status` (Pending, In Progress, Completed) and `Priority` (Low, Medium, High).
*    **Validation:** Intelligent due date validations to prevent selecting past dates.

---

## 4.  Tech Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend** | React, Vite, Material UI (MUI), Axios, React Router |
| **Backend** | Python, FastAPI, SQLAlchemy, Pydantic, Passlib (Bcrypt) |
| **Database** | SQLite |
| **Testing** | Playwright (TypeScript), Page Object Model (POM) |
| **CI/CD** | GitHub Actions |

---

## 5.  Installation Guide

Ensure you have **Node.js (v18+)** and **Python (3.9+)** installed on your system.

Clone the repository:
```bash
git clone https://github.com/your-username/task-management-testing.git
cd task-management-testing
```

---

## 6. ️ Running Backend

Navigate to the backend directory, set up the virtual environment, and start the FastAPI server:

```bash
cd backend

# Create and activate virtual environment (Windows)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start the API server
uvicorn app.main:app --reload
```
The backend API will be available at `http://localhost:8000`. 
Interactive API documentation (Swagger UI) is automatically generated at `http://localhost:8000/docs`.

---

## 7.  Running Frontend

Open a new terminal window, navigate to the frontend directory, and start the Vite development server:

```bash
cd frontend

# Install dependencies
npm install

# Start the React app
npm run dev
```
The frontend application will be accessible at `http://localhost:5173`.

---

## 8.  Running Playwright Tests

To execute the automated end-to-end test suite:

```bash
cd playwright

# Install Node modules and Playwright browsers (first time only)
npm install
npx playwright install

# Run tests in headless mode
npx playwright test

# Run tests with UI Mode (Interactive)
npx playwright test --ui

# View HTML Test Report
npx playwright show-report
```

---

## 9.  QA Deliverables

This project includes a complete suite of professional QA artifacts located in the `qa-artifacts/` directory:

*    **Test Cases (`test-cases.md`)**: 37 comprehensive manual test cases covering Positive Testing, Negative Testing, and Boundary Value Analysis.
*    **Defect Report (`defect-report.md`)**: Professionally logged bugs with Severity, Priority, Preconditions, Steps to Reproduce, and Expected/Actual Results.
*    **Test Execution Report (`execution-report.md`)**: Summary of test metrics (Total, Passed, Failed) before and after bug fixes.
*    **Retest Report (`retest-report.md`)**: Verification of developer fixes and closure of previously failed tests.
*    **Traceability Matrix (`traceability-matrix.md`)**: Mapping between Requirements -> Test Cases -> Defects.

---

## 10.  Defect Lifecycle

During the testing phase, the following critical defects were identified, reported, and eventually fixed by the development team:

*   **BUG-001:** Search functionality was case-sensitive, preventing users from finding tasks if casing didn't exactly match.
    *   *Resolution:* Applied `func.lower()` at the SQLAlchemy ORM layer for case-insensitive filtering.
*   **BUG-002:** The system allowed users to bypass the past due date validation when *updating* an existing task, despite blocking it during task creation.
    *   *Resolution:* Implemented identical validation logic on the `TaskUpdate` Pydantic schema.

Both bugs were thoroughly documented, re-tested, and successfully marked as **Closed**.

---

## 11.  CI/CD Pipeline

The project utilizes **GitHub Actions** for Continuous Integration and Continuous Testing. 

Upon every Push or Pull Request to the `main` branch:
1. The backend server and frontend client are automatically built and started in the background.
2. The Playwright E2E automation suite is executed.
3. An HTML Test Report is generated and uploaded as a workflow artifact.

See the configuration file at `.github/workflows/playwright.yml`.

---

## 12.  Repository Structure

```text
task-management-testing/
├── backend/                  # FastAPI Application (Routers, Models, Schemas)
├── frontend/                 # React UI (Components, Contexts, Pages)
├── playwright/               # Automation Framework
│   ├── pages/                # Page Object Model (POM) Classes
│   └── tests/                # E2E Test Specs
├── qa-artifacts/             # Professional QA Documentation
│   ├── test-cases.md
│   ├── defect-report.md
│   ├── execution-report.md
│   ├── retest-report.md
│   └── traceability-matrix.md
├── screenshots/              # Project Screenshots & GIFs
└── README.md                 # You are here!
```

---

## 13.  Screenshots Section

*(Add your screenshots here by saving them to the `screenshots/` folder and linking them)*

*   **Dashboard View:** `![Dashboard](screenshots/dashboard.png)`
*   **Playwright UI Mode:** `![Playwright](screenshots/playwright.png)`
*   **Swagger API Docs:** `![Swagger](screenshots/swagger.png)`

---

## 14.  Learning Outcomes

By building and testing this system, I successfully demonstrated:
*   The ability to design robust **Test Plans** and execute **Test Cases** against real-world requirements.
*   Proficiency in tracking defects through their entire lifecycle.
*   Strong coding skills in **TypeScript** to write maintainable **Playwright** automation tests using the **Page Object Model (POM)** design pattern.
*   Knowledge of modern CI/CD pipelines integrating automated tests.
*   Familiarity with Full-Stack development concepts (REST APIs, React State Management, ORM Data Mapping), bridging the gap between Dev and QA.

---

## 15.  Future Improvements

*   Implement API Testing using Postman / Newman or Pytest.
*   Add Visual Regression Testing using Playwright's screenshot comparison.
*   Dockerize the entire stack (Frontend, Backend, Database) via `docker-compose`.
*   Integrate a cloud-hosted PostgreSQL database.

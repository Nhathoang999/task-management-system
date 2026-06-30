# Master Test Plan
**Project Name**: Task Management Web Application
**Document Version**: 1.0
**Date**: 2026-06-30

## 1. Introduction
This document outlines the Master Test Plan for the Task Management Web Application, defining the scope, approach, resources, and schedule of testing activities. It ensures that the final product meets enterprise quality standards.

## 2. Scope
### 2.1 In-Scope
- **Authentication**: User Registration, Login, Session Management, Logout.
- **Task Management (CRUD)**: Create, Read, Update, Delete tasks.
- **Search & Filter**: Keyword search, filter by Status (Pending, In Progress, Completed), filter by Priority (Low, Medium, High).
- **UI/UX**: Responsive design validation, error handling, validation messages.
- **Cross-browser Compatibility**: Chrome, Firefox, Edge, Safari (latest versions).

### 2.2 Out-of-Scope
- Load/Performance testing.
- Security/Penetration testing (basic role validation is in scope).
- Third-party integrations (none currently applicable).

## 3. Test Strategy
### 3.1 Testing Levels
- **Unit Testing**: Executed by Developers (Backend: Pytest, Frontend: Jest/Vitest).
- **Integration Testing**: API endpoint validation (Postman/Playwright API testing).
- **System/E2E Testing**: UI automation using Playwright.
- **Manual Exploratory Testing**: Unscripted testing to find edge cases.

### 3.2 Automation Approach
- **Tool**: Playwright with TypeScript.
- **Design Pattern**: Page Object Model (POM) with a centralized `BasePage`.
- **Execution**: Triggered via GitHub Actions CI/CD pipeline on every Push/Pull Request.

## 4. Resource & Environment
- **Environment**: Staging (`localhost:3000` / `localhost:8000`)
- **Database**: SQLite (Test isolation via Fixtures).
- **Tools**: Playwright, GitHub Actions, Node.js, Python.

## 5. Defect Management
- Defects will be logged in the `bugs/` directory as markdown files.
- **Severity Levels**: Blocker, Critical, Major, Minor, Trivial.
- **Priority Levels**: High, Medium, Low.

## 6. Deliverables
- Test Plan & Strategy
- Test Cases (Manual & Automated)
- Traceability Matrix
- Playwright HTML Report
- Defect Reports

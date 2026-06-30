# Release Checklist (Pre-Deployment QA)

## 1. Application Readiness
- [ ] Backend APIs (FastAPI) are stable and pass unit tests.
- [ ] Frontend (React) build compiles successfully without warnings.
- [ ] Environment variables for staging/production are configured correctly.

## 2. Test Execution
- [ ] Playwright E2E Regression suite (`@regression`) executed and passed (100%).
- [ ] Playwright HTML Report reviewed for flakiness.
- [ ] All high-priority manual exploratory scenarios executed.

## 3. Defect Status
- [ ] Zero Blocker or Critical defects open.
- [ ] All known Major defects documented with workarounds or deferred with PM approval.
- [ ] BUG-001 and BUG-002 (if applicable to this release) are verified and closed.

## 4. Automation Artifacts
- [ ] Traceability Matrix updated.
- [ ] Test Cases document versioned and archived.
- [ ] Test Data in `test-data/` is scrubbed of any PII (Personally Identifiable Information).

## 5. Sign-off
- QA Lead Approval: ____________
- Engineering Manager Approval: ____________
- Date: ____________

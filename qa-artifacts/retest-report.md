# Retest Report

**Project:** Task Management Application  
**Execution Date:** 2026-06-15  
**Environment:** Windows 11, Chrome 120 (http://localhost:5173, http://localhost:8000)

## Test Execution Summary

### Before Fix
* **Total Test Cases:** 37
* **Passed:** 35
* **Failed:** 2

### After Retest
* **Total Test Cases:** 37
* **Passed:** 37
* **Failed:** 0

---

## Defect Retest Details

### BUG-001
* **Defect ID:** BUG-001
* **Related Test Case:** TC_TASK_15
* **Fix Verification Steps:**
  1. Navigate to Dashboard.
  2. Locate search input and search for existing task "Review Q3 Report".
  3. Type lowercase query: "review q3 report".
  4. Verify the correct task appears in the grid.
* **Retest Result:** Passed (Search is successfully matching in a case-insensitive manner using `func.lower()`).
* **Defect Status:** Closed

### BUG-002
* **Defect ID:** BUG-002
* **Related Test Case:** TC_TASK_11
* **Fix Verification Steps:**
  1. Open Dashboard and click Edit on an existing task.
  2. Change the Due Date field to a date in the past.
  3. Click Save.
  4. Verify the system rejects the update and shows the "Due date cannot be earlier than current date/time" error.
* **Retest Result:** Passed (Validation is correctly triggering during the update operation).
* **Defect Status:** Closed

---

## Traceability Workflow (Retest Phase)

`TC_TASK_11` -> `BUG-002` -> Retest -> Passed  
`TC_TASK_15` -> `BUG-001` -> Retest -> Passed

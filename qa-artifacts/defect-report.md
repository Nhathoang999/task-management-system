# Defect Report

## BUG-001

### Summary

Search functionality is case-sensitive.

### Module

Task Management - Search

### Severity

Medium

### Priority

High

### Environment

* OS: Windows 11
* Browser: Chrome 120
* Frontend: http://localhost:5173
* Backend: http://localhost:8000

### Build Version

v1.0.0

### Status

Closed

### Preconditions

* User is logged in.
* Existing task title: "Review Q3 Report".

### Steps to Reproduce

1. Navigate to Dashboard.
2. Enter "review q3 report" in Search field.
3. Observe search results.

### Expected Result

The search should be case-insensitive and return the task "Review Q3 Report".

### Actual Result

No matching tasks are returned.

### Root Cause (Suspected)

Backend search query may be using case-sensitive matching.

### Recommendation

Use case-insensitive filtering (e.g., SQLAlchemy ilike()).

---

## BUG-002

### Summary

Past due date validation is bypassed during task update.

### Module

Task Management - Update Task

### Severity

High

### Priority

High

### Environment

* OS: Windows 11
* Browser: Chrome 120
* Frontend: http://localhost:5173
* Backend: http://localhost:8000

### Build Version

v1.0.0

### Status

Closed

### Preconditions

* User is logged in.
* Existing task available.

### Steps to Reproduce

1. Open Dashboard.
2. Click Edit on an existing task.
3. Set Due Date to a past date.
4. Click Save.

### Expected Result

The application should reject the update and display:
"Due date cannot be earlier than current date/time".

### Actual Result

Task is updated successfully with a past due date.

### Root Cause (Suspected)

Validation exists during Create Task but is missing in Update Task endpoint.

### Recommendation

Apply the same due date validation logic to both Create and Update operations.

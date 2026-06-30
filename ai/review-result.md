# AI Test Case Review Results

## Feedback from Gemini (Simulated)

Based on the provided test cases (TC-001 to TC-013), here are the missing scenarios you should consider adding:

### 1. Missing Boundary Value Analysis (BVA)
*   **Task Title Length**: What is the maximum character limit for a task title? Test exactly at the limit (e.g., 255 chars) and one over the limit (256 chars).
*   **Due Date Boundaries**: You have a past date test (TC-006). You should add a test for exactly 'Today' and extremely far future dates (e.g., Year 9999) to see how the UI handles it.

### 2. Missing Negative Testing
*   **SQL Injection / XSS**: Try creating a task with `<script>alert('xss')</script>` in the title to ensure it is sanitized.
*   **Unauthorized Access**: Try to hit the `/dashboard` route directly without logging in (TC for routing guards).
*   **Invalid ID update**: Try manipulating the URL or API payload to update a task ID that does not belong to the user.

### 3. Missing Validation
*   **Duplicate Tasks**: Can a user create two tasks with the exact same title? If no, where is the validation error?
*   **Description Length**: Are there limits on the description field?

---

## QA Review & Decision

*   **Boundary Cases (Title Length)**: **Accepted**. Will add TC-014 for max length.
*   **XSS Testing**: **Accepted**. Important for security. Will add TC-015.
*   **Duplicate Tasks**: **Rejected**. The system intentionally allows identical titles (differentiated by ID).

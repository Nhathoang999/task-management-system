# Task Management Application - Manual Test Cases

| Test Case ID | Module | Priority | Preconditions | Test Steps | Expected Results |
|--------------|--------|----------|---------------|------------|------------------|
| TC_AUTH_01 | Authentication | High | User is on Register page | 1. Enter valid new email<br>2. Enter valid password (>=6 chars)<br>3. Click Register | User is registered and redirected to Login page |
| TC_AUTH_02 | Authentication | High | User is on Register page | 1. Leave email empty<br>2. Enter valid password<br>3. Click Register | Registration fails with HTML5 validation or "Email cannot be empty" error |
| TC_AUTH_03 | Authentication | Medium | User is on Register page | 1. Enter invalid email format (e.g., `test@`)<br>2. Enter valid password<br>3. Click Register | Registration fails with invalid email format error |
| TC_AUTH_04 | Authentication | High | User is on Register page | 1. Enter valid email<br>2. Leave password empty<br>3. Click Register | Registration fails with HTML5 validation or empty password error |
| TC_AUTH_05 | Authentication | Medium | User is on Register page | 1. Enter valid email<br>2. Enter password of exactly 5 characters<br>3. Click Register | Registration fails due to min_length boundary constraint (`< 6`) |
| TC_AUTH_06 | Authentication | Medium | User is on Register page | 1. Enter valid email<br>2. Enter password of exactly 6 characters<br>3. Click Register | Registration succeeds (lower boundary limit met) |
| TC_AUTH_07 | Authentication | High | User is on Register page | 1. Enter email of an existing user<br>2. Enter password<br>3. Click Register | Registration fails with "Email already registered" error |
| TC_AUTH_08 | Authentication | High | User is on Login page | 1. Enter valid email<br>2. Enter valid password<br>3. Click Login | User logs in successfully, JWT token stored, redirected to Dashboard |
| TC_AUTH_09 | Authentication | High | User is on Login page | 1. Enter valid email<br>2. Enter incorrect password<br>3. Click Login | Login fails with "Incorrect email or password" error |
| TC_AUTH_10 | Authentication | High | User is logged in, on Dashboard | 1. Click Logout button on Navbar | Token removed from storage, user redirected to Login page |
| TC_AUTH_11 | Authentication | High | User is on Login page | 1. Enter non-existent email<br>2. Enter any password<br>3. Click Login | Login fails with "Incorrect email or password" error |
| TC_TASK_01 | Task Management | High | User is logged in, on Dashboard | 1. Click Create Task<br>2. Fill all fields (Title, Desc, Status, Priority, Due Date)<br>3. Click Save | Task is created and appears on Dashboard grid |
| TC_TASK_02 | Task Management | High | User is logged in, on Dashboard | 1. Click Create Task<br>2. Fill only Title field<br>3. Click Save | Task is created successfully with default Status (Pending) and Priority (Medium) |
| TC_TASK_03 | Task Management | High | User is logged in, on Dashboard | 1. Click Create Task<br>2. Leave Title empty<br>3. Click Save | Task creation fails, UI displays "Title cannot be empty" error |
| TC_TASK_04 | Task Management | Medium | User is logged in, on Dashboard | 1. Click Create Task<br>2. Set Due Date to today's date<br>3. Fill Title, Click Save | Task is created successfully (date boundary allowed) |
| TC_TASK_05 | Task Management | High | User is logged in, on Dashboard | 1. Click Create Task<br>2. Set Due Date to a past date<br>3. Fill Title, Click Save | Task creation fails, API returns validation error for past date |
| TC_TASK_06 | Task Management | Medium | User is logged in, on Dashboard | 1. Click Create Task<br>2. Set Due Date to future date<br>3. Fill Title, Click Save | Task created successfully with the provided due date |
| TC_TASK_07 | Task Management | Low | User is logged in, on Dashboard | 1. Click Create Task<br>2. Enter extremely long text (1000+ chars) in Description<br>3. Fill Title, Click Save | Task created successfully, layout adjusts to accommodate long description |
| TC_TASK_08 | Task Management | High | User has an existing task | 1. Click Edit on a task<br>2. Change Title text<br>3. Click Save | Task is updated with new title on Dashboard |
| TC_TASK_09 | Task Management | Medium | User has an existing task | 1. Click Edit on a task<br>2. Change Status from Pending to In Progress<br>3. Click Save | Task is updated and displays "In Progress" chip |
| TC_TASK_10 | Task Management | High | User has an existing task | 1. Click Edit on a task<br>2. Clear the Title field entirely<br>3. Click Save | Update fails, UI blocks save due to empty title requirement |
| TC_TASK_11 | Task Management | High | User has an existing task | 1. Click Edit on a task<br>2. Change Due Date to a past date<br>3. Click Save | Update fails, API returns validation error for past date |
| TC_TASK_12 | Task Management | High | User has an existing task | 1. Click Delete on a task<br>2. Confirm deletion prompt | Task is deleted and backend successfully processes the removal |
| TC_TASK_13 | Task Management | High | User has deleted a task | 1. Observe Dashboard grid after deletion | Deleted task is no longer visible on the Dashboard grid |
| TC_TASK_14 | Task Management | Medium | Tasks exist with different titles | 1. Type exact title of existing task in search bar | Dashboard displays only the matching task(s) |
| TC_TASK_15 | Task Management | High | Tasks exist with title "Buy groceries" | 1. Type "buy groceries" or "BUY GROCERIES" in search bar | Dashboard displays the task (case-insensitive boundary verification) |
| TC_TASK_16 | Task Management | Medium | Tasks exist with title "Weekly Report" | 1. Type partial match "week" or "report" in search bar | Dashboard displays the task matching the partial string |
| TC_TASK_17 | Task Management | Medium | Tasks exist | 1. Type a random string not in any task title in search bar | Dashboard displays no tasks (empty grid scenario) |
| TC_TASK_18 | Task Management | Low | User is on Dashboard | 1. Create task with JS `<script>alert('xss')</script>` in description | Task saves securely without executing scripts (XSS prevention test) |
| TC_FLTR_01 | Filters | High | Tasks exist with various statuses | 1. Select 'Pending' from Status dropdown | Only tasks with Pending status are displayed |
| TC_FLTR_02 | Filters | High | Tasks exist with various statuses | 1. Select 'Completed' from Status dropdown | Only tasks with Completed status are displayed |
| TC_FLTR_03 | Filters | High | Tasks exist with various priorities| 1. Select 'High' from Priority dropdown | Only tasks with High priority are displayed |
| TC_FLTR_04 | Filters | High | Tasks exist with various priorities| 1. Select 'Low' from Priority dropdown | Only tasks with Low priority are displayed |
| TC_FLTR_05 | Filters | High | Tasks exist with various fields | 1. Set Status to 'In Progress'<br>2. Set Priority to 'Medium' | Only tasks matching BOTH In Progress AND Medium are displayed |
| TC_FLTR_06 | Filters | Medium| Only 'Pending/Low' tasks exist | 1. Set Status to 'Completed'<br>2. Set Priority to 'High' | Grid is empty, no tasks match the combination (Negative combination) |
| TC_FLTR_07 | Filters | Medium| Status is set to 'Completed' | 1. Change Status dropdown back to 'All' (empty value) | Filter is removed, all matching tasks without status restriction are shown |
| TC_FLTR_08 | Filters | Medium| Priority is set to 'High' | 1. Change Priority dropdown back to 'All' (empty value) | Filter is removed, all matching tasks without priority restriction are shown |

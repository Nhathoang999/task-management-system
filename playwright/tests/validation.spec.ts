import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import users from '../test-data/valid/users.json';
import invalidTasks from '../test-data/invalid/tasks.json';

test.describe('Form Validations @validation', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users[0].email, users[0].password);
    dashboardPage = new DashboardPage(page);
  });

  test('Validate missing title error', async ({ page }) => {
    const task = invalidTasks.find(t => t.scenario === 'Missing Title');
    if (!task) return;
    
    await dashboardPage.click(dashboardPage.createTaskButton);
    await dashboardPage.fill(dashboardPage.taskDescInput, task.description);
    await dashboardPage.click(dashboardPage.saveTaskButton);
    
    // Check validation message
    const errorMsg = page.locator(`text=${task.expectedError}`);
    await expect(errorMsg).toBeVisible();
    await dashboardPage.takeScreenshot('validation-missing-title');
  });
});

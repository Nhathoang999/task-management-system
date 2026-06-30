import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import users from '../test-data/valid/users.json';

test.describe('Search and Filter Tests @regression', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users[0].email, users[0].password);
    
    dashboardPage = new DashboardPage(page);
  });

  test('Search tasks by exact title', async () => {
    await dashboardPage.searchTask('Review AI Test Cases');
    
    // We expect only matching tasks to show
    const taskCards = dashboardPage.page.locator('.MuiCard-root');
    // Basic verification - should take screenshot for evidence
    await dashboardPage.takeScreenshot('search-exact');
  });

  test('Filter tasks by status', async () => {
    await dashboardPage.filterByStatus('In Progress');
    await dashboardPage.takeScreenshot('filter-status');
  });

  test('Filter tasks by priority', async () => {
    await dashboardPage.filterByPriority('High');
    await dashboardPage.takeScreenshot('filter-priority');
  });
});

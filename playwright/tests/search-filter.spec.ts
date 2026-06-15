import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Search and Filter', () => {
  let dashboardPage: DashboardPage;
  let uniquePrefix: string;

  test.beforeEach(async ({ page }) => {
    uniquePrefix = `FindMe${Date.now()}`;
    const loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    await loginPage.navigate();
    await loginPage.login('admin@test.com', 'Admin123!');
    await expect(dashboardPage.createTaskButton).toBeVisible();

    // Create a couple of tasks for filtering
    await dashboardPage.createTask(`${uniquePrefix} 1`, 'Desc', 'Pending', 'High');
    await dashboardPage.createTask(`${uniquePrefix} 2`, 'Desc', 'Completed', 'Low');
  });

  test('Search Existing Task', async () => {
    await dashboardPage.searchTask(`${uniquePrefix} 1`);
    
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 1`)).toBeVisible();
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 2`)).toBeHidden();
  });

  test('Search Non-existing Task', async () => {
    await dashboardPage.searchTask('NonExistentTaskXYZ');
    
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 1`)).toBeHidden();
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 2`)).toBeHidden();
  });

  test('Filter by Status', async () => {
    // Clear search first
    await dashboardPage.searchTask('');

    await dashboardPage.filterByStatus('Completed');
    
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 2`)).toBeVisible();
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 1`)).toBeHidden();
  });

  test('Filter by Priority', async () => {
    await dashboardPage.searchTask('');

    await dashboardPage.filterByPriority('High');
    
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 1`)).toBeVisible();
    await expect(dashboardPage.getTaskCard(`${uniquePrefix} 2`)).toBeHidden();
  });
});

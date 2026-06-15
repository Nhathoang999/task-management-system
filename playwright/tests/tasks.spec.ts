import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Task Management', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    await loginPage.navigate();
    await loginPage.login('admin@test.com', 'Admin123!');
    await expect(dashboardPage.createTaskButton).toBeVisible();
  });

  test('Create Task', async () => {
    const title = `Task ${Date.now()}`;
    await dashboardPage.createTask(title, 'Description for new task');
    
    const taskCard = dashboardPage.getTaskCard(title);
    await expect(taskCard).toBeVisible();
  });

  test('Update Task', async () => {
    const title = `Task Update ${Date.now()}`;
    await dashboardPage.createTask(title);
    
    const newTitle = `Updated Task ${Date.now()}`;
    await dashboardPage.updateTask(title, newTitle);
    
    await expect(dashboardPage.getTaskCard(newTitle)).toBeVisible();
    await expect(dashboardPage.getTaskCard(title)).toBeHidden();
  });

  test('Delete Task', async () => {
    const title = `Task Delete ${Date.now()}`;
    await dashboardPage.createTask(title);
    
    await dashboardPage.deleteTask(title);
    
    await expect(dashboardPage.getTaskCard(title)).toBeHidden();
  });
});

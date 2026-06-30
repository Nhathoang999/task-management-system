import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import users from '../test-data/valid/users.json';

test.describe('Full E2E Regression @regression @e2e', () => {
  test('Complete user journey: Login -> Create -> Search -> Edit -> Delete -> Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users[0].email, users[0].password);
    
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.createTaskButton).toBeVisible();
    
    const title = `E2E Task ${Date.now()}`;
    await dashboardPage.createTask(title, 'E2E description', 'Pending', 'Low');
    await expect(dashboardPage.getTaskCard(title)).toBeVisible();
    
    await dashboardPage.searchTask(title);
    await expect(dashboardPage.getTaskCard(title)).toBeVisible();
    
    const updatedTitle = title + ' Updated';
    await dashboardPage.updateTask(title, updatedTitle);
    
    await dashboardPage.searchTask(updatedTitle);
    await dashboardPage.deleteTask(updatedTitle);
    await expect(dashboardPage.getTaskCard(updatedTitle)).toBeHidden();
    
    await dashboardPage.click(dashboardPage.logoutButton);
    await expect(loginPage.loginButton).toBeVisible();
  });
});

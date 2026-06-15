import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Authentication', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('Login Success', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login('admin@test.com', 'Admin123!');
    
    // Wait for navigation to dashboard and verify logout button is visible
    await expect(dashboardPage.logoutButton).toBeVisible({ timeout: 10000 });
  });

  test('Login Failure', async ({ page }) => {
    await loginPage.navigate();
    await loginPage.login('wrong@test.com', 'wrongpassword');
    
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Incorrect email or password');
  });
});

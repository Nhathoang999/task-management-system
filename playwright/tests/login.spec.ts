import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../test-data/valid/users.json';

test.describe('Authentication Tests @smoke', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Successful login with valid credentials', async ({ page }) => {
    const user = users[0];
    await loginPage.login(user.email, user.password);
    
    // Verify successful login by checking dashboard presence
    await expect(page.getByTestId('create-task-button')).toBeVisible();
    await loginPage.takeScreenshot('login-success');
  });

  test('Failed login with invalid credentials @negative', async () => {
    await loginPage.login('invalid@example.com', 'wrongpass');
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.takeScreenshot('login-fail');
  });
});

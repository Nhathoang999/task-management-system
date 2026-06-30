import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import tasks from '../test-data/valid/tasks.json';
import users from '../test-data/valid/users.json';

test.describe('Task CRUD Operations @smoke @regression', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users[0].email, users[0].password);
    
    dashboardPage = new DashboardPage(page);
  });

  test('Create a new task', async () => {
    const task = tasks[0];
    await dashboardPage.createTask(task.title, task.description, task.status, task.priority);
    
    const taskCard = dashboardPage.getTaskCard(task.title);
    await expect(taskCard).toBeVisible();
    await dashboardPage.takeScreenshot('task-created');
  });

  test('Update an existing task', async () => {
    const oldTitle = tasks[0].title;
    const newTitle = 'Updated: ' + oldTitle;
    
    await dashboardPage.updateTask(oldTitle, newTitle);
    
    const taskCard = dashboardPage.getTaskCard(newTitle);
    await expect(taskCard).toBeVisible();
    await dashboardPage.takeScreenshot('task-updated');
  });

  test('Delete a task', async () => {
    const title = 'Updated: ' + tasks[0].title;
    await dashboardPage.deleteTask(title);
    
    const taskCard = dashboardPage.getTaskCard(title);
    await expect(taskCard).toBeHidden();
    await dashboardPage.takeScreenshot('task-deleted');
  });
});

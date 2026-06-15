import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly createTaskButton: Locator;
  readonly logoutButton: Locator;
  readonly searchInput: Locator;
  readonly statusFilter: Locator;
  readonly priorityFilter: Locator;
  
  // Task Dialog
  readonly taskTitleInput: Locator;
  readonly taskDescInput: Locator;
  readonly taskStatusSelect: Locator;
  readonly taskPrioritySelect: Locator;
  readonly taskDueDateInput: Locator;
  readonly saveTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createTaskButton = page.getByTestId('create-task-button');
    this.logoutButton = page.getByTestId('logout-button');
    this.searchInput = page.getByTestId('search-task-input');
    
    // MUI Selects need special handling
    this.statusFilter = page.locator('[data-testid="status-filter"]').locator('xpath=..');
    this.priorityFilter = page.locator('[data-testid="priority-filter"]').locator('xpath=..');

    this.taskTitleInput = page.getByTestId('task-title-input');
    this.taskDescInput = page.getByTestId('task-desc-input');
    this.taskStatusSelect = page.locator('[data-testid="task-status-select"]').locator('xpath=..');
    this.taskPrioritySelect = page.locator('[data-testid="task-priority-select"]').locator('xpath=..');
    this.taskDueDateInput = page.getByTestId('task-due-date-input');
    this.saveTaskButton = page.getByTestId('save-task-button');
  }

  async createTask(title: string, desc?: string, status?: string, priority?: string) {
    await this.createTaskButton.click();
    await this.taskTitleInput.fill(title);
    if (desc) await this.taskDescInput.fill(desc);
    
    if (status) {
      await this.taskStatusSelect.click();
      await this.page.getByRole('option', { name: status, exact: true }).click();
    }
    if (priority) {
      await this.taskPrioritySelect.click();
      await this.page.getByRole('option', { name: priority, exact: true }).click();
    }
    
    await this.saveTaskButton.click();
    await expect(this.taskTitleInput).toBeHidden();
  }

  async updateTask(oldTitle: string, newTitle: string) {
    const taskCard = this.page.locator('.MuiCard-root', { hasText: oldTitle });
    await taskCard.locator('button:has-text("Edit")').click();
    
    // Clear and type new title
    await this.taskTitleInput.fill('');
    await this.taskTitleInput.fill(newTitle);
    
    await this.saveTaskButton.click();
    await expect(this.taskTitleInput).toBeHidden();
  }

  async deleteTask(title: string) {
    const taskCard = this.page.locator('.MuiCard-root', { hasText: title });
    this.page.once('dialog', dialog => dialog.accept());
    await taskCard.locator('button:has-text("Delete")').click();
  }

  async searchTask(title: string) {
    await this.searchInput.fill(title);
  }

  async filterByStatus(status: string) {
    await this.statusFilter.click();
    await this.page.getByRole('option', { name: status, exact: true }).click();
  }

  async filterByPriority(priority: string) {
    await this.priorityFilter.click();
    await this.page.getByRole('option', { name: priority, exact: true }).click();
  }

  getTaskCard(title: string): Locator {
    return this.page.locator('.MuiCard-root', { hasText: title });
  }
}

import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
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
    super(page);
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
    await this.click(this.createTaskButton);
    await this.fill(this.taskTitleInput, title);
    if (desc) await this.fill(this.taskDescInput, desc);
    
    if (status) {
      await this.click(this.taskStatusSelect);
      await this.click(this.page.getByRole('option', { name: status, exact: true }));
    }
    if (priority) {
      await this.click(this.taskPrioritySelect);
      await this.click(this.page.getByRole('option', { name: priority, exact: true }));
    }
    
    await this.click(this.saveTaskButton);
    await expect(this.taskTitleInput).toBeHidden();
  }

  async updateTask(oldTitle: string, newTitle: string) {
    const taskCard = this.page.locator('.MuiCard-root', { hasText: oldTitle }).first();
    await this.click(taskCard.locator('button:has-text("Edit")'));
    
    // Clear and type new title
    await this.fill(this.taskTitleInput, '');
    await this.fill(this.taskTitleInput, newTitle);
    
    await this.click(this.saveTaskButton);
    await expect(this.taskTitleInput).toBeHidden();
  }

  async deleteTask(title: string) {
    const taskCard = this.page.locator('.MuiCard-root', { hasText: title }).first();
    this.page.once('dialog', dialog => dialog.accept());
    await this.click(taskCard.locator('button:has-text("Delete")'));
  }

  async searchTask(title: string) {
    await this.fill(this.searchInput, title);
  }

  async filterByStatus(status: string) {
    await this.click(this.statusFilter);
    await this.click(this.page.getByRole('option', { name: status, exact: true }));
  }

  async filterByPriority(priority: string) {
    await this.click(this.priorityFilter);
    await this.click(this.page.getByRole('option', { name: priority, exact: true }));
  }

  getTaskCard(title: string): Locator {
    return this.page.locator('.MuiCard-root', { hasText: title }).first();
  }
}

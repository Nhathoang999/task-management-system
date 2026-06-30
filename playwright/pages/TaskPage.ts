import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TaskPage extends BasePage {
  readonly taskTitleInput: Locator;
  readonly taskDescInput: Locator;
  readonly taskStatusSelect: Locator;
  readonly taskPrioritySelect: Locator;
  readonly taskDueDateInput: Locator;
  readonly saveTaskButton: Locator;

  constructor(page: Page) {
    super(page);
    this.taskTitleInput = page.getByTestId('task-title-input');
    this.taskDescInput = page.getByTestId('task-desc-input');
    this.taskStatusSelect = page.locator('[data-testid="task-status-select"]').locator('xpath=..');
    this.taskPrioritySelect = page.locator('[data-testid="task-priority-select"]').locator('xpath=..');
    this.taskDueDateInput = page.getByTestId('task-due-date-input');
    this.saveTaskButton = page.getByTestId('save-task-button');
  }

  async fillTaskDetails(title: string, desc?: string, status?: string, priority?: string) {
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
  }

  async saveTask() {
    await this.click(this.saveTaskButton);
    await expect(this.taskTitleInput).toBeHidden();
  }
}

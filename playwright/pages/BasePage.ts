import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async waitForToast(message: string) {
    // Assuming a generic toast or alert, can be adapted based on UI component
    const toast = this.page.locator(`text=${message}`);
    await toast.waitFor({ state: 'visible' });
    return toast;
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async assertElementVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}

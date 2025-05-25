import { Page, test, expect } from '@playwright/test';
import { BASE_URL } from '../config/urls';

export class LoginPage {
  readonly page: Page;
  readonly loginInput;
  readonly passwordInput;
  readonly loginSubmitButton;
  readonly sidebarPulseLink;
  readonly loadingSpinner;
  readonly emailErrorTooltip;

  private isNavigating: boolean = false;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator('input[name="login"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginSubmitButton = page.getByRole('button', { name: 'Войти' });
    this.loadingSpinner = page.locator('.b-common_content_loader-wrapper');
    this.sidebarPulseLink = page.getByRole('link', { name: 'Пульс' });
    this.emailErrorTooltip = page.locator('[title="Некорректный email"]');
  }

  async goto() {
    await test.step('Navigate to the login page', async () => {
      await this.page.goto(BASE_URL);
    });
  }

  async checkLoginFieldsVisible() {
    await test.step('Verify login and password input fields are visible', async () => {
      await this.loginInput.waitFor({ state: 'visible' });
      await this.passwordInput.waitFor({ state: 'visible' });
      await this.loginSubmitButton.waitFor({ state: 'visible' });
    });
  }

  async login(username: string, password: string) {
    await test.step('Fill in credentials and submit login form', async () => {
      if (this.isNavigating) {
        console.warn('Login attempt ignored: already navigating');
        return;
      }
      this.isNavigating = true;

      await this.loginInput.fill(username);
      await this.passwordInput.fill(password);
      await this.clickLoginButton();

      setTimeout(() => (this.isNavigating = false), 5000);
    });
  }

  async clickLoginButton() {
    await this.loginSubmitButton.waitFor({ state: 'visible' });
    await this.loginSubmitButton.click();
  }

  async checkLoginSuccess() {
    await test.step('Verify successful login by loader and sidebar visibility', async () => {
      await this.loadingSpinner.waitFor({ state: 'visible' }).catch(() => {});
      await this.loadingSpinner.waitFor({ state: 'hidden' });
      await expect(this.sidebarPulseLink).toBeVisible();
    });
  }

  async checkLoginFailure() {
    await test.step('Verify the login error message is visible', async () => {
      await expect(this.emailErrorTooltip).toBeVisible();
    });
  }

  async checkUrlNegative() {
    await test.step('Verify that URL has not changed', async () => {
      const currentUrl = this.page.url();
      await this.page.waitForTimeout(500);
      expect(this.page.url()).toBe(currentUrl);
    });
  }
}

import { Page, expect, test } from '@playwright/test';

export class VersionPage {
  readonly page: Page;
  readonly sidebarAdministrationLink;
  readonly applicationsTabLink;
  readonly applicationsTabActiveHeader;
  readonly modulesSectionTitle;
  readonly versionTooltip;

  constructor(page: Page) {
    this.page = page;
    this.sidebarAdministrationLink = page.locator('[title="Администрирование"]');
    this.applicationsTabLink = page.locator('[title="Приложения"]');
    this.applicationsTabActiveHeader = page.locator('#sub_header').getByText('Приложения');
    this.modulesSectionTitle = page.locator('.ui-table-heading-title', { hasText: 'Модули' });
    this.versionTooltip = page.locator('[title^="Версия"]');
  }

  async openAdministrationPage() {
    await test.step('Open the "Администрирование" page from the sidebar', async () => {
      await this.sidebarAdministrationLink.waitFor({ state: 'visible' });
      await this.sidebarAdministrationLink.click();
    });
  }

  async verifyAdministrationPageIsOpen() {
    await test.step('Verify the "Приложения" tab is visible and active', async () => {
      await this.applicationsTabLink.waitFor({ state: 'visible' });
      await this.applicationsTabActiveHeader.waitFor({ state: 'visible' });
    });
  }

  async verifyModulesTitleVisible() {
    await test.step('Verify the "Модули" title is visible', async () => {
      await this.modulesSectionTitle.scrollIntoViewIfNeeded();
      await expect(this.modulesSectionTitle).toBeVisible();
    });
  }

  async verifyVersion(expectedVersion: string) {
    await test.step('Verify the displayed application version matches the expected version', async () => {
      await expect(this.versionTooltip).toBeVisible();
      const actualTitle = await this.versionTooltip.getAttribute('title');
      expect(actualTitle).toContain(expectedVersion);
    });
  }
}

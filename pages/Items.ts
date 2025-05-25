import { Page, expect, test } from '@playwright/test';

export class ItemsPage {
  readonly page: Page;
  readonly administrationItem;
  readonly sidebar;
  readonly sidebarItems;
  readonly folowersItem;

  constructor(page: Page) {
    this.page = page;
    this.administrationItem = page.locator('[title="Администрирование"]');
    this.folowersItem = page.locator('[title="Подписки"]');
    this.sidebar = page.locator('.b-sidebar-menu-list');
    this.sidebarItems = page.locator('.b-sidebar-menu-list-item');
  }

  async verifySidebarStructure(expectedTitles: string[]) {
    await test.step('Verify sidebar has correct items in correct order', async () => {
      await this.sidebar.waitFor({ state: 'visible' });

      const actualTitles = await this.sidebar.getByRole('link').allInnerTexts();
      const normalizedActual = actualTitles.map(t => t.trim());
      const normalizedExpected = expectedTitles.map(t => t.trim());

      console.log('');
      normalizedActual.forEach((title, i) => {
        console.log(`${i + 1}. ${title}`);
      });

      const actualLower = normalizedActual.slice(0, normalizedExpected.length).map(t => t.toLowerCase());
      const expectedLower = normalizedExpected.map(t => t.toLowerCase());

      expect(actualLower).toEqual(expectedLower);
    });
  }

  async checkSettingsNotVisible() {
    await test.step('Check that "Настройки" is not visible in sidebar', async () => {
      const settingsItem = this.sidebarItems.filter({ hasText: 'Настройки' });
      await expect(settingsItem).toHaveCount(0);
    });
  }

  async selectSubscripeItem() {
    await this.folowersItem.waitFor( {state: 'visible'} )
    await this.folowersItem.click()
  }
}

import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ItemsPage } from '../pages/Items';
import { sidebarTitles } from '../data/sidebarTitles';

const loginData = require('../data/data_for_login.json');

test.describe.parallel('Administration item', () => {
  test('Verify sidebar structure and ensure "Настройки" section is not visible for admin', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const itemsPage = new ItemsPage(page);

    await test.step('Open login page and sign in as admin user', async () => {
      await loginPage.goto();
      await loginPage.checkLoginFieldsVisible();
      await loginPage.login(loginData.admin_login.login, loginData.admin_login.userpassword);
      await loginPage.checkLoginSuccess();
    });

    await test.step('Verify sidebar sections and their order', async () => {
      await itemsPage.verifySidebarStructure(sidebarTitles);
    });

    await test.step('Ensure "Настройки" section is not visible', async () => {
      await itemsPage.checkSettingsNotVisible();
    });
  });
});

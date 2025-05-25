import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { VersionPage } from '../pages/version';
import { versionData } from '../data/versionData';

const loginData = require('../data/data_for_login.json');

test.describe.parallel('Administration item check', () => {
  test('Login and verify modules section and system version', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const versionPage = new VersionPage(page);

    await test.step('Open login page and perform login as admin', async () => {
      await loginPage.goto();
      await loginPage.checkLoginFieldsVisible();
      await loginPage.login(loginData.admin_login.login, loginData.admin_login.userpassword);
      await loginPage.checkLoginSuccess();
    });

    await test.step('Navigate to the Administration page', async () => {
      await versionPage.openAdministrationPage();
      await versionPage.verifyAdministrationPageIsOpen();
    });

    await test.step('Verify Modules section is visible', async () => {
      await versionPage.verifyModulesTitleVisible();
    });

    await test.step('Check the displayed system version matches expected', async () => {
      await versionPage.verifyVersion(versionData.expectedVersion);
    });
  });
});

import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ItemsPage } from '../pages/Items';
import { SubscriptionsPage } from '../pages/subscriptions';
import { caseData } from '../data/caseData';
import { BASE_URL } from '../config/urls';
import loginData from '../data/data_for_login.json';

test.describe.parallel('Subscriptions tests', () => {
  test.beforeEach(async ({ context, page }) => {
    await context.clearCookies();
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Checking subscriptions functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const itemsPage = new ItemsPage(page);
    const subscriptionsPage = new SubscriptionsPage(page);

    async function runStep(stepName: string, stepFn: () => Promise<void>) {
      try {
        await test.step(stepName, stepFn);
      } catch (error) {
        console.error(`❌ Error on step: ${stepName}`, error);
        throw new Error(`Step "${stepName}" error: ${(error as Error).message}`);
      }
    }

    await runStep('Open login page and sign in as admin', async () => {
      await loginPage.goto();
      await loginPage.checkLoginFieldsVisible();
      await loginPage.login(loginData.admin_login.login, loginData.admin_login.userpassword);
      await loginPage.checkLoginSuccess();
    });

    await runStep('Navigate to "Subscriptions" section', async () => {
      await itemsPage.selectSubscripeItem();
      await subscriptionsPage.checkOpenedPage();
    });

    await runStep('Create a new subscription with a unique name', async () => {
      await subscriptionsPage.createNewDataButton();
      await subscriptionsPage.addNewDealButton();

      const uniqueName = `example_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      await subscriptionsPage.nameModalFieldFill(uniqueName);
      await subscriptionsPage.caseTypeFieldModalFill(caseData.projectType);
      await subscriptionsPage.clickSubmitButtonModal();
      await subscriptionsPage.caseNameInTable(uniqueName);
      await subscriptionsPage.openCreatedCase(uniqueName);
    });

    await runStep('Verify default values in case fields', async () => {
      await subscriptionsPage.innFieldCase();
      await subscriptionsPage.ogrnFieldCase();
      await subscriptionsPage.dateFilterCase();
      await subscriptionsPage.checkBoxIstecCase();
      await subscriptionsPage.checkBoxResponseCase();
      await subscriptionsPage.checkBoxOtherTypeCase();
    });

    await runStep('Select organization and fill in legal fields', async () => {
      await subscriptionsPage.selectValueOrganization(caseData.org);
      await subscriptionsPage.innFieldCaseFull(caseData.inn);
      await subscriptionsPage.ogrnFieldCaseFull(caseData.ogrn);
    });

    await runStep('Select participation types', async () => {
      await subscriptionsPage.checkBoxIstecCaseSelected();
      await subscriptionsPage.checkBoxResponseCaseSelected();
      await subscriptionsPage.checkBoxOtherTypeCaseSelected();
    });

    await runStep('Save case and activate monitoring', async () => {
      await subscriptionsPage.saveEditButtonCaseForm();
      await subscriptionsPage.selectMonitoringItemCase();
      await subscriptionsPage.saveEditButtonCaseForm();
    });

    await runStep('Check that fields are now disabled', async () => {
      await subscriptionsPage.checkIfFieldsIsDisabled();
    });

    await runStep('Go to Events tab and verify monitoring event popup', async () => {
      await subscriptionsPage.selectTabEventsCase();
      await subscriptionsPage.eventOnTheListCase();
      await subscriptionsPage.redirectOnModalFullEvent();
      await subscriptionsPage.popupFieldsCase();
    });
  });
});

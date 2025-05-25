import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
const loginData = require('../data/data_for_login.json');

test.describe.parallel('Authorization', () => {

  test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Wait for login fields', async () => {
      await loginPage.checkLoginFieldsVisible();
    });

    await test.step('Perform login with valid credentials', async () => {
      await loginPage.login(loginData.admin_login.login, loginData.admin_login.userpassword);
    });

    await test.step('Verify successful login', async () => {
      await loginPage.checkLoginSuccess();
    });
  });

  test('Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Wait for login fields', async () => {
      await loginPage.checkLoginFieldsVisible();
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(
        loginData.admin_incorrect_login_and_password.login,
        loginData.admin_incorrect_login_and_password.userpassword
      );
    });

    await test.step('Verify error message is shown', async () => {
      await loginPage.checkLoginFailure();
    });

    await test.step('Verify URL did not change', async () => {
      await loginPage.checkUrlNegative();
    });
  });

  test('Login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Go to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Wait for login fields', async () => {
      await loginPage.checkLoginFieldsVisible();
    });

    await test.step('Click login button without entering credentials', async () => {
      await loginPage.clickLoginButton();
    });

    await test.step('Verify URL did not change', async () => {
      await loginPage.checkUrlNegative();
    });
  });

});

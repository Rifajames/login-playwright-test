const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('the user is on the login page', async function () {
  await this.loginPage.navigate();
});

When('the user enters valid username and password', async function () {
  await this.loginPage.login('student', 'Password123');
});

When('the user enters invalid username and password', async function () {
  await this.loginPage.login('invalid', 'invalid123');
});

Then('the user should see the logout message', async function () {
  await this.loginPage.waitForLoginSuccessMessage();
  const visible = await this.loginPage.isLoginSuccessMessageVisible();
  assert.strictEqual(visible, true);
});

Then('the user should see an error message', async function () {
  const visible = await this.page.isVisible(this.loginPage.errorMessage);
  assert.strictEqual(visible, true);
});

Then('the user should see {string} heading', async function (expectedText) {
  const actualText = await this.dashboardPage.getHeaderText();
  assert.strictEqual(actualText.trim(), expectedText);
});
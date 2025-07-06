const { Before, After, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

let screenshotCounter = 1;

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();

  // Inisialisasi Page Object ke dalam context Cucumber (this)
  this.loginPage = new LoginPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = path.join(
      'reports',
      `FAILED_${screenshotCounter++}_${scenario.pickle.name.replace(/\s+/g, '_')}.png`
    );
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved at: ${screenshotPath}`);
  }

  await this.browser.close();
});
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  get usernameInput() { return '#username'; }
  get passwordInput() { return '#password'; }
  get loginButton() { return '#submitt'; }
  get errorMessage() { return '.show'; }
  get logoutButton() {  return 'a.wp-block-button__link'; }
  get successMessage() { return 'h1.post-title'; }



  async navigate() {
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async isErrorVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async isLoginSuccessMessageVisible() {
    return await this.page.isVisible(this.successMessage);
  }

  async waitForLoginSuccessMessage() {
    await this.page.waitForSelector(this.successMessage, { state: 'visible', timeout: 5000 });
  }
}

module.exports = LoginPage;
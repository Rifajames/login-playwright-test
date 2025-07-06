class DashboardPage {
  constructor(page) {
    this.page = page;
  }

  get headerTitle() { return 'h1'; }
  get logoutButton() { return 'a[href="/practice-test-login/#"]'; }

  async getHeaderText() {
    return await this.page.textContent(this.headerTitle);
  }

  async isLogoutButtonVisible() {
    return await this.page.isVisible(this.logoutButton);
  }

  async clickLogout() {
    await this.page.click(this.logoutButton);
  }



}

module.exports = DashboardPage;
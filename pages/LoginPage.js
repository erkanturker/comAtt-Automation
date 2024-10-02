const { loadAccountCredentials } = require("../utils/accountLoader");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInputLocator = this.page.locator("#formBasicUsername");
    this.passwordInputLocator = this.page.locator("#formBasicPassword");
    this.loginButtonLocator = this.page.locator(".login-button");
    this.titleLocator = this.page.locator("h1");
    this.accounts = loadAccountCredentials();
  }

  async login(username, password) {
    await this.page.goto("https://comattfrontend.onrender.com/");
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  async loginByAdmin() {
    const { username, password } = this.accounts.admin;
    await this.login(username, password);
  }

  async loginByTeacher() {
    const { username, password } = this.accounts.teacher;
    await this.login("a", password);
  }

  async getTitleText() {
    await this.titleLocator.waitFor({ state: "visible" });
    return await this.titleLocator.textContent();
  }
}

module.exports = LoginPage;

const { loadAccountCredentials } = require("../utils/accountLoader");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInputLocator = this.page.locator("#formBasicUsername");
    this.passwordInputLocator = this.page.locator("#formBasicPassword");
    this.loginButtonLocator = this.page.locator(".login-button");
    this.accounts = loadAccountCredentials();
  }

  async login(username, password) {
    await this.page.goto("/");
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
    await this.login(username, password);
  }
}

module.exports = LoginPage;

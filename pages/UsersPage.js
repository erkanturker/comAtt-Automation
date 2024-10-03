const BasePage = require("./BasePage");

class UsersPage extends BasePage {
  constructor(page) {
    super(page);
    this.usersLinkLocator = this.page.locator("div.nav>a", {
      hasText: "Users",
    });
    this.usernameInputLocator = this.page.locator("#username");
    this.passwordInputLocator = this.page.locator("#password");
    this.firstnameInputLocator = this.page.locator("#firstName");
    this.lastnameInputLocator = this.page.locator("#lastName");
    this.emailInputLocator = this.page.locator("#email");
    this.roleDropDownLocator = this.page.locator("#role");
    this.createButtonLocator = this.page.getByTestId("submit");
    this.alertTitleLocator = this.page.locator(".alert-heading");
  }

  async fillCreateUserForm(user) {
    const { username, password, firstName, lastName, email, role } = user;
    await this.fillText(username, this.usernameInputLocator);
    await this.fillText(password, this.passwordInputLocator);
    await this.fillText(firstName, this.firstnameInputLocator);
    await this.fillText(lastName, this.lastnameInputLocator);
    await this.fillText(email, this.emailInputLocator);
    await this.selectOptionByLabel(role, this.roleDropDownLocator);
    this.createButtonLocator.click();
  }

  async getDeleteButtonLocatorByUsername(username) {
    return this.page
      .locator("tr", { hasText: `${username}` })
      .locator(".btn.btn-danger.btn-sm");
  }
}

module.exports = UsersPage;

const { test: base, chromium, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const UsersPage = require("../pages/UsersPage");

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    use(loginPage);
  },
  loginByAdmin: async ({ loginPage }, use) => {
    await loginPage.loginByAdmin();
    await use(loginPage);
  },
  loginByTeacher: async ({ loginPage }, use) => {
    await loginPage.loginByTeacher();
    await use(loginPage);
  },
  usersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page);
    use(usersPage);
  },
  navigateUsersPage: async ({ loginPage, usersPage }, use) => {
    await loginPage.loginByAdmin();
    await usersPage.usersLinkLocator.click();
    use(usersPage);
  },
});

module.exports = { test, chromium, expect };

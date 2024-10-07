const { test: base, chromium, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    use(loginPage);
  },
  loginByAdmin: async ({ loginPage }, use) => {
    await loginPage.loginByAdmin();
    await use(loginPage);
  },
});

module.exports = { test, chromium, expect };

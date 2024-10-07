const { test, chromium, expect } = require("../fixtures/usePageObjects");
const LoginPage = require("../pages/LoginPage");

test("Test withouth page fixure", { tag: ["@noFixture"] }, async () => {
  const browser = await chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.loginByAdmin();

  const actualTitleText = await loginPage.getTitleText();
  expect(actualTitleText).toBe("Dashboard");
});

test("test with fixure", { tag: ["@fixture"] }, async ({ loginByAdmin }) => {
  const actualTitleText = await loginByAdmin.getTitleText();
  expect(actualTitleText).toBe("Dashboard");
});

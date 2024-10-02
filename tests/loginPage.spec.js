const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const fs = require("fs");

test.describe("Login Page", { tag: ["@login", "@smoke"] }, () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Admin Should Login", async () => {
    await loginPage.loginByAdmin();

    const actualTitleText = await loginPage.getTitleText();
    expect(actualTitleText).toBe("Dashboard");
  });

  test("Teacher Should Login", async () => {
    await loginPage.loginByTeacher();

    const actualTitleText = await loginPage.getTitleText();
    expect(actualTitleText).toBe("Dashboard");
  });
});



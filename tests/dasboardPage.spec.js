const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const DashboardPage = require("../pages/DashboardPage");

test("test dashboard", { tag: ["@dashboard"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dasbhoardPage = new DashboardPage(page);

  await loginPage.loginByAdmin();

  await page.waitForResponse(
    (response) =>
      response.url() === "https://comatt.onrender.com/users" &&
      response.request().method() === "GET"
  );

  await page.waitForResponse(
    (response) =>
      response.url() === "https://comatt.onrender.com/students" &&
      response.request().method() === "GET"
  );

  const teacherStasText =
    await dasbhoardPage.teacherStatsCardLocator.textContent();

  const studentsStasText =
    await dasbhoardPage.studentsStatsCardLocator.textContent();

  console.log(teacherStasText);
  console.log(studentsStasText);
});

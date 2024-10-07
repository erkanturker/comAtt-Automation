const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const DashboardPage = require("../pages/DashboardPage");
const { waitForSpecificResponse, mockApiResponse } = require("../utils/api");

test("test dashboard", { tag: ["@dashboard"] }, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dasbhoardPage = new DashboardPage(page);

  await loginPage.loginByAdmin();
  await waitForSpecificResponse(page, "users");
  await waitForSpecificResponse(page, "students");

  const teacherStasText =
    await dasbhoardPage.teacherStatsCardLocator.textContent();

  const studentsStasText =
    await dasbhoardPage.studentsStatsCardLocator.textContent();

  console.log(teacherStasText);
  console.log(studentsStasText);
});

test("mock Teacher response", { tag: ["@mock"] }, async ({ page }) => {
  const mockTeacherData = [
    {
      username: "admin",
      firstName: "admin",
      lastName: "test",
      email: "admin@gmail.com",
      role: "admin",
    },
    {
      username: "jsmith",
      firstName: "John",
      lastName: "Smith",
      email: "jsmith@example.com",
      role: "teacher",
    },
    {
      username: "test",
      firstName: "test",
      lastName: "test",
      email: "test@example.com",
      role: "admin",
    },
  ];

  await mockApiResponse(page, "users", mockTeacherData);

  const loginPage = new LoginPage(page);
  const dasbhoardPage = new DashboardPage(page);

  await loginPage.loginByAdmin();
  await waitForSpecificResponse(page, "users");

  const teacherStasText =
    await dasbhoardPage.teacherStatsCardLocator.textContent();

  console.log(teacherStasText);
});

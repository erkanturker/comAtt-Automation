const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const UsersPage = require("../pages/UsersPage");
const DbHelper = require("../helpers/DbHelper");

test.describe.serial("Users Page", { tag: ["@users"] }, () => {
  let loginPage;
  let usersPage;
  let dbHelper = new DbHelper();

  const user = {
    username: "testUsername",
    password: "12345",
    firstName: "Test name",
    lastName: "Test lastName",
    email: "lastname@gmail.com",
    role: "Teacher",
  };

  test.beforeAll(async () => {
    await dbHelper.connect();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    usersPage = new UsersPage(page);

    await loginPage.loginByAdmin();
    await usersPage.usersLinkLocator.click();
  });

  test.afterAll(async () => {
    await dbHelper.disconnect();
  });

  test("user verify page title", async () => {
    const actualTitleText = await usersPage.getTitleText();
    expect(actualTitleText).toBe("Users");
  });

  test("Admin Can Create User", async () => {
    await usersPage.fillCreateUserForm(user);

    const actualAlertHeadingText =
      await usersPage.alertTitleLocator.textContent();
    expect(actualAlertHeadingText).toBe("Success");

    const { username: actualUser } = await dbHelper.getUserFromDbByUsername(
      user.username
    );
    expect(actualUser).toBe(user.username);
  });

  test("Admin can delete User", async () => {
    const deleteButton = await usersPage.getDeleteButtonLocatorByUsername(
      user.username
    );
    await deleteButton.click();

    const actualAlertHeadingText =
      await usersPage.alertTitleLocator.textContent();
    expect(actualAlertHeadingText).toBe("Info");
  });
});

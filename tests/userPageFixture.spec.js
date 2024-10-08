const { test, expect } = require("../fixtures/usePageObjects");

test.describe.serial("User Page Fixture", { tag: ["@usersFixture"] }, () => {
  const user = {
    username: "testUsername",
    password: "12345",
    firstName: "Test name",
    lastName: "Test lastName",
    email: "lastname@gmail.com",
    role: "Teacher",
  };

  test("user verify page title", async ({ navigateUsersPage }) => {
    const actualTitleText = await navigateUsersPage.getTitleText();
    expect(actualTitleText).toBe("Users");
  });

  test("Admin can Create Users", async ({ navigateUsersPage }) => {
    await navigateUsersPage.fillCreateUserForm(user);

    const actualAlertHeadingText =
      await navigateUsersPage.alertTitleLocator.textContent();
    expect(actualAlertHeadingText).toBe("Success");
  });

  test("Admin can Delete Users", async ({ navigateUsersPage }) => {
    const deleteButton =
      await navigateUsersPage.getDeleteButtonLocatorByUsername(user.username);
    await deleteButton.click();

    const actualAlertHeadingText =
      await navigateUsersPage.alertTitleLocator.textContent();
    expect(actualAlertHeadingText).toBe("Info");
  });
});

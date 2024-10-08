const { test, expect } = require("../fixtures/usePageObjects");

test.describe("Login Page", () => {
  test(
    "Admin can login with Fixture",
    { tag: ["@fixtureAdmin"] },
    async ({ loginByAdmin }) => {
      const actualTitleText = await loginByAdmin.getTitleText();
      expect(actualTitleText).toBe("Dashboard");
    }
  );

  test(
    "Teacher can login with Fixture",
    { tag: ["@fixtureTeacher"] },
    async ({ loginByTeacher }) => {
      const actualTitleText = await loginByTeacher.getTitleText();
      expect(actualTitleText).toBe("Dashboard");
    }
  );
});

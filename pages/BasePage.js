class BasePage {
  constructor(page) {
    this.page = page;
    this.titleLocator = this.page.locator("h1");
  }

  async getTitleText() {
    await this.titleLocator.waitFor({ state: "visible" });
    return await this.titleLocator.textContent();
  }

  async fillText(value, locator) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async selectOptionByLabel(value, locator) {
    await locator.waitFor({ state: "visible" });
    await locator.selectOption({ label: `${value}` });
  }
}

module.exports = BasePage;

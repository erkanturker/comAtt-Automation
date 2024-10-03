const BasePage = require("./BasePage");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.teacherStatsCardLocator = this.page.locator(".flex-column.col-6", {
      hasText: "Teacher",
    });
    
    this.studentsStatsCardLocator = this.page.locator(".flex-column.col-6", {
      hasText: "Students",
    });
  }
}

module.exports = DashboardPage;

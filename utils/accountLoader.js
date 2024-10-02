const fs = require("fs");

function loadAccountCredentials() {
  const env = process.env.ENV;
  const accountsRawData = fs.readFileSync("./auth/accounts.json");
  const accounts = JSON.parse(accountsRawData);
  return accounts[env];
}

module.exports = { loadAccountCredentials };

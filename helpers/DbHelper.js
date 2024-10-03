const { Client } = require("pg");

class DbHelper {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE CONNECTION STRING IS NOT FOUND");
    }

    this.client = new Client({ connectionString });
  }

  async connect() {
    await this.client.connect();
    console.log("DB is connected");
  }

  async disconnect() {
    await this.client.end();
    console.log("DB is disconnected");
  }

  async getUserFromDbByUsername(username) {
    const result = await this.client.query(
      "SELECT username FROM users WHERE username=$1",
      [username]
    );
    return result.rows[0];
  }

  async deleteUserByUsername(username) {
    await this.client.query("DELETE FROM users WHERE username=$1", [username]);
  }
}

module.exports = DbHelper;

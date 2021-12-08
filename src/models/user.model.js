const { connection } = require("../../db-connection");

class User {
  static findMany() {
    const sql = "SELECT * FROM users";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM users WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static createOne(user) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [user]);
  }
}

module.exports = User;

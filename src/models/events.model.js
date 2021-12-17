const { connection } = require("../../db-connection");

class Events {
  static findMany() {
    const sql = "SELECT * FROM events";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(events) {
    const sql = "INSERT INTO events SET ?";
    return connection.promise().query(sql, [events]);
  }

  static typicalChoice(events) {
    const sql = "SELECT * FROM events WHERE type=?";
    return connection.promise().query(sql, [events]);
  }
}

module.exports = Events;

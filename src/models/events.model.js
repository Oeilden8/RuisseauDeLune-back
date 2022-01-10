const { connection } = require("../../db-connection");

class Events {
  static findMany() {
    // utiliser un innerjoin pour recup les assets avec l'event
    const sql = "SELECT * FROM events";
    return connection.promise().query(sql);
  }

  static findOneEventById(id) {
    const sql = "SELECT * FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(events) {
    const sql = "INSERT INTO events SET ?";
    return connection.promise().query(sql, [events]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static typicalChoice(type) {
    const sql = "SELECT * FROM events WHERE type=?";
    return connection.promise().query(sql, [type]);
  }

  static updateOne(newEvent) {
    const sql = "UPDATE events SET ?";
    return connection.promise().query(sql, [newEvent]);
  }
}

module.exports = Events;

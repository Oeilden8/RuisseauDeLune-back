const { connection } = require("../../db-connection");

class SelectionAssets {
  static findMany() {
    const sql = "SELECT * FROM selection_assets";
    return connection.promise().query(sql);
  }

  static findOneLinkById(id) {
    const sql = "SELECT * FROM selection_assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(link) {
    const sql = "INSERT INTO selection_assets SET ?";
    return connection.promise().query(sql, [link]);
  }

  static deleteOneById(events_id) {
    const sql = "DELETE FROM selection_assets WHERE events_id=?";
    return connection.promise().query(sql, [events_id]);
  }
}

module.exports = SelectionAssets;

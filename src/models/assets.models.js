const { connection } = require("../../db-connection");

class Asset {
  static findMany() {
    const sql = "SELECT * FROM assets";
    return connection.promise().query(sql);
  }

  static findOneAssetById(id) {
    const sql = "SELECT * FROM assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(asset) {
    const sql = "INSERT INTO assets SET ?";
    return connection.promise().query(sql, [asset]);
  }
}
module.exports = Asset;

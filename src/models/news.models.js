const { connection } = require("../../db-connection");

class News {
  static findMany() {
    const sql = "SELECT * FROM news";
    return connection.promise().query(sql);
  }

  static findOneNewsById(id) {
    const sql = "SELECT * FROM news WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneNewsWithAssetById(id) {
    const sql = "SELECT * FROM news INNER JOIN assets ON news.assets_id = assets.id WHERE news.id=?";
    return connection.promise().query(sql, [id]);
  }

  static orderNewsByDate() {
    const sql =
      "SELECT n.title, n.places, n.date_first, n.date_last, n.description, a.source, a.type, a.asset_name FROM news AS n LEFT JOIN assets AS a ON n.assets_id = a.id ORDER BY date_first ASC";
    return connection.promise().query(sql);
  }

  static deleteOneNewsById(id) {
    const sql = "DELETE FROM news WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(news) {
    const sql = "INSERT INTO news SET ?";
    return connection.promise().query(sql, [news]);
  }

  static updateOne(newEvent, id) {
    const sql = "UPDATE news SET ? WHERE id=?";
    return connection.promise().query(sql, [newEvent, id]);
  }
}

module.exports = News;

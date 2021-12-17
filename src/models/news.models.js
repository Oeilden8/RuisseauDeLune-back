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

  static orderNewsByDate() {
    const sql = "SELECT * FROM news ORDER date_first ASC";
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

  static updateOne(newEvent) {
    const sql = "UPDATE users SET ?";
    return connection.promise().query(sql, [newEvent]);
  }
}

module.exports = News;

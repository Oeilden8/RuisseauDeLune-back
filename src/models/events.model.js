const { connection } = require("../../db-connection");

class Events {
  // static findMany() {
  //   const sql = "SELECT * FROM events";
  //   return connection.promise().query(sql);
  // }

  static findManyWithAssets() {
    // selectionne la source et les champs de la table events via jointure de la table intermédiaire avec events et assets ou les assets sont des images et on trie par event id
    const sql =
      "SELECT source, a.type AS asset_type, e.id, e.type, e.title, e.places, e.description FROM assets AS a INNER JOIN selection_assets AS s ON s.assets_id=a.id INNER JOIN events AS e ON e.id = s.events_id ORDER BY e.id";
    return connection.promise().query(sql);
  }

  static findOneEventById(id) {
    const sql = "SELECT * FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // static findOneEventWithAssetsById(id) {
  //   const sql =
  //     "SELECT events.id, events.type, events.title, events.places, events.description, a.source FROM events INNER JOIN selection_assets AS s ON s.events_id=events.id INNER JOIN assets AS a ON a.id = s.assets_id WHERE events.id=?";
  //   return connection.promise().query(sql, [id]);
  // }

  static createOne(events) {
    const sql = "INSERT INTO events SET ?";
    return connection.promise().query(sql, [events]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM events WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static typeChoice(type) {
    const sql = "SELECT * FROM events WHERE type=?";
    return connection.promise().query(sql, [type]);
  }

  static updateOne(newEvent) {
    const sql = "UPDATE events SET ?";
    return connection.promise().query(sql, [newEvent]);
  }

  static findAssetsByEventId(id) {
    // selectionne les images liées à un evenement
    const sql =
      "SELECT source, a.type FROM assets AS a INNER JOIN selection_assets AS s ON s.assets_id=a.id INNER JOIN events AS e ON e.id = s.events_id WHERE e.id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Events;

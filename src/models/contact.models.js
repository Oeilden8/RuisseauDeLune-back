const { connection } = require("../../db-connection");

class Contact {
  static findManyContact() {
    const sql = "SELECT * FROM contact";
    return connection.promise().query(sql);
  }

  static findOneContactById(id) {
    const sql = "SELECT * FROM contact WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // vérifie que le nom existe via query de firstname_lastname ds la database

  static findOneContactWithAssetById(id) {
    const sql = "SELECT * FROM contact INNER JOIN assets ON contact.assets_id = assets.id WHERE contact.id=?";
    return connection.promise().query(sql, [id]);
  }

  static async contactAlreadyExists(name) {
    const sql = "SELECT * FROM contact WHERE firstname_lastname=?";
    const [result] = await connection.promise().query(sql, [firstname_lastname]);
    return result.length > 0;
  }

  static updateOneContact(newContact, id) {
    const sql = "UPDATE contact SET ? WHERE id=?";
    return connection.promise().query(sql, [newContact, id]);
  }

  static deleteOneContactById(id) {
    const sql = "DELETE FROM contact WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOneContact(contact) {
    const sql = "INSERT INTO contact SET ?";
    return connection.promise().query(sql, [contact]);
  }
}

module.exports = Contact;

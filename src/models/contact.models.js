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

  static async contactAlreadyExists(name) {
    const sql = "SELECT * FROM contact WHERE firstname_lastname=?";
    const [result] = await connection.promise().query(sql, [name]);
    return result.length > 0;
  }

  static updateOneContact(newContact) {
    const sql = "UPDATE contact SET ?";
    return connection.promise().query(sql, [newContact]);
  }

  static findOneContactByName(name) {
    const sql = "SELECT * FROM contact WHERE firstname_lastname=?";
    return connection.promise().query(sql, [name]);
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

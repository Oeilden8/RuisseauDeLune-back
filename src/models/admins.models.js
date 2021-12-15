const { argon2d } = require("argon2");
const { connection } = require("../../db-connection");
// connection : les infos pour se connecter a la database

class Admins {
  static findMany() {
    const sql = "SELECT * FROM admins";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM admins WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static deleteOnebyId(id) {
    const sql = "DELETE FROM admins WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // vérifie que l'email existe via query de email ds la database
  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM admins WHERE email=?";
    const [result] = await connection.promise().query(sql, [email]);
    return result.length > 0;
  }

  // hash le password via argon2
  static async passwordHashing(password) {
    const hashedPassword = await argon2d.hash(password);
    return hashedPassword;
  }

  // verifié le hashing
  static async verifyPassword(password, hashedPassword) {
    const valid = await argon2d.verify(hashedPassword, password);
    return valid;
  }

  static createOne(admin) {
    const sql = "INSERT INTO admins SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

module.exports = Admins;

// connection.promise.query : attends la connection pour envoyer la query

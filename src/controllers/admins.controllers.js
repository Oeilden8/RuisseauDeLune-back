const { Admins } = require("../models");

const getAllAdmins = async (req, resp) => {
  try {
    const [results] = await Admins.findMany();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneAdminById = async (req, resp) => {
  // si id est fournie ds la query => req.param, sinon req.id(par ex pour renvoyer ds un post)
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Admins.findOneAdminById(id);
    if (result.length === 0) {
      resp.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const validateNewAdminData = async (req, resp, next) => {
  const { email } = req.body;
  if (await Admins.emailAlreadyExists(email)) {
    resp.status(401).send(`${email} est déjà utilisé par un Admin`);
    // pour vérifier le password voir joi
  } else {
    next();
  }
};

const createOneAdmin = async (req, resp, next) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const hashedPassword = await Admins.passwordHashing(password);
    // console.log(hashedPassword);
    const [result] = await Admins.createOne({ email, hashedPassword });
    // console.log(result);
    req.id = result.insertId;
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const deleteOneAdmin = async (req, resp) => {
  const { id } = req.params;
  try {
    const [result] = await Admins.deleteOnebyId(id);
    if (result.affectedRows === 0) {
      resp.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      resp.status(200).send(`Admin ${id} supprimé`);
    }
  } catch (err) {
    resp.status(500).send(`erreur lors de la suppression de l'admin : ${err.message}`);
  }
};

const verifyAdminLogin = async (req, resp, next) => {
  const { email, password } = req.body;
  try {
    const [result] = await Admins.findOneAdminByEmail(email);
    if (result.length === 0) {
      resp.status(404).send("Cet email n'appartient à aucun utilisateur");
    } else {
      const { hashedPassword } = result[0];
      // si le password et le password hashé ds la db correspondent renvoie true
      const validPassword = await Admins.verifyPasswordHash(hashedPassword, password);
      if (!validPassword) {
        resp.status(401).send("Mot de passe erroné");
      } else {
        req.adminId = result[0].id;
        // authentification successfull : on recupère l'user id pour créer le token
        next();
      }
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

module.exports = {
  getAllAdmins,
  getOneAdminById,
  createOneAdmin,
  deleteOneAdmin,
  validateNewAdminData,
  verifyAdminLogin,
};

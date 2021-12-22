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
  const { email, password } = req.body;
  if (await Admins.emailAlreadyExists(email)) {
    resp.status(401).send(`${email} est déjà utilisé par un Admin`);
  } else if (!Admins.verifyPasswordHash(password)) {
    resp.status(404).send("mot de passe invalide");
  } else {
    next();
  }
};

const createOneAdmin = async (req, resp, next) => {
  const { email, password } = req.body;
  try {
    const [result] = await Admins.createOne({ email, password });
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

module.exports = {
  getAllAdmins,
  getOneAdminById,
  createOneAdmin,
  deleteOneAdmin,
  validateNewAdminData,
};

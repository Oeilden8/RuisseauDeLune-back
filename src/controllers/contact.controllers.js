const { Contact } = require("../models");

const getAllContacts = async (req, res) => {
  try {
    const [results] = await Contact.findManyContact();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneContactById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Contact.findOneContactWithAssetById(id);
    if (result.lengh === 0) {
      res.status(404).send(`Contact avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const validateDataCreateContact = async (req, res, next) => {
  const { name } = req.body;
  if (await Contact.contactAlreadyExists(name)) {
    res.status(401).send(`${name} est déjà créé`);
  } else {
    next();
  }
};

const updateOneContactById = async (req, resp, next) => {
  const { id } = req.params;
  const { firstname_lastname, email, phone, description, assets_id } = req.body;
  const newContact = {};
  if (firstname_lastname) {
    newContact.firstname_lastname = firstname_lastname;
  }
  if (email) {
    newContact.email = email;
  }
  if (phone) {
    newContact.phone = phone;
  }
  if (description) {
    newContact.description = description;
  }
  if (assets_id) {
    newContact.assets_id = assets_id;
  }

  try {
    await Contact.updateOneContact(newContact, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOneMoreContact = async (req, res, next) => {
  // si image deja la, assets_id est recup via front
  const { firstname_lastname, email, phone, description, assets_id } = req.body;
  try {
    const [result] = await Contact.createOneContact({ firstname_lastname, email, phone, description, assets_id });
    req.id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Contact.deleteOneContactById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Contact ${id} non trouvé`);
    } else {
      res.status(200).send(`Contact ${id} supprimé`);
    }
  } catch (err) {
    res.status(500).send(`erreur lors de la suppression du contact : ${err.message}`);
  }
};
module.exports = {
  getAllContacts,
  getOneContactById,
  validateDataCreateContact,
  updateOneContactById,
  createOneMoreContact,
  deleteOneContact,
};

const { Contact } = require("../models");

const getAllContacts = async (req, res) => {
  try {
    const [results] = await Contact.findManyContact();
    res.status(200).json(results);
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
  const { firstname_lastname } = req.body;
  if (await Contact.contactAlreadyExists(firstname_lastname)) {
    res.status(401).send(`Le contact ${firstname_lastname} existe déjà`);
  } else {
    next();
  }
};

const updateOneContactById = async (req, resp, next) => {
  const { id } = req.params;
  const { firstname_lastname, presentation, phone, diplomes, assets_id } = req.body;

  if (!firstname_lastname && !presentation && !phone && !diplomes && !assets_id) {
    resp.status(400).send("veuillez repmlir les champs obligatoires svp");
  } else {
    const newContact = {};

    if (firstname_lastname) {
      newContact.firstname_lastname = firstname_lastname;
    }
    if (presentation) {
      newContact.presentation = presentation;
    }
    if (phone) {
      newContact.phone = phone;
    }
    if (diplomes) {
      newContact.diplomes = diplomes;
    }
    if (assets_id) {
      newContact.assets_id = assets_id;
    }

    try {
      await Contact.updateOneContact(newContact, id);
      next();
    } catch (err) {
      resp.status(500).send(err.message);
    }
  }
};

const createOneMoreContact = async (req, res, next) => {
  const { firstname_lastname, presentation, phone, diplomes, assets_id } = req.body;
  const contactToCreate = { firstname_lastname, presentation, phone, diplomes };

  if (assets_id) {
    contactToCreate.assets_id = assets_id;
  }

  if (!firstname_lastname) {
    res.status(400).send("veuillez repmlir les champs obligatoires svp");
  } else {
    try {
      const [result] = await Contact.createOneContact(contactToCreate);
      req.id = result.insertId;
      next();
    } catch (err) {
      // console.log(err.message);
      res.status(500).send(err.message);
    }
  }
};

const deleteOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Contact.deleteOneContactById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Contact ${id} non trouvé`);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // console.log("delete", err.message);
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

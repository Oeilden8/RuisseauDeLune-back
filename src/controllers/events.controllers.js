const { Events } = require("../models");

const getAllEvents = async (req, res) => {
  try {
    const [results] = await Events.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneEventById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Events.findOneEventById(id);
    if (result.length === 0) {
      res.status(404).send(`Évènement avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createOneEvent = async (req, res, next) => {
  try {
    const [result] = await Events.createOne(req.body);
    req.id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Events.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Évènement avec l'id ${id} non trouvé`);
    } else {
      res.status(200).send(`Évènement ${id} supprimé`);
    }
  } catch (err) {
    res.status(500).send(`Erreur lors de la suppression de l'évènement`);
  }
};

const getOneType = async (req, res) => {
  const { type } = req.params;
  try {
    const [result] = await Events.typicalChoice(type);
    if (result.length === 0) {
      res.status(404).send(`Le type n'existe pas`);
    } else {
      res.status(200).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateOneEventById = async (req, resp, next) => {
  const { id } = req.params;
  const { type, title, places, description } = req.body;
  const newEvent = {};
  if (type) {
    newEvent.type = type;
  }
  if (title) {
    newEvent.title = title;
  }
  if (places) {
    newEvent.places = places;
  }
  if (description) {
    newEvent.description = description;
  }
  try {
    await Events.updateOne(newEvent, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

module.exports = {
  getAllEvents,
  getOneEventById,
  createOneEvent,
  deleteOneEvent,
  getOneType,
  updateOneEventById,
};

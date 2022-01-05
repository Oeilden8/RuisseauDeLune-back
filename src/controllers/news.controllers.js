const { News } = require("../models");

const getAllNews = async (req, resp) => {
  try {
    const [results] = await News.orderNewsByDate();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneNewsById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await News.findOneNewsWithAssetById(id);
    if (result.length === 0) {
      resp.status(404).send(`News avec l'id ${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOneNews = async (req, resp, next) => {
  const { title, actual_place, date_first, date_last, description, assets_id } = req.body;
  try {
    const [result] = await News.createOne({ title, actual_place, date_first, date_last, description, assets_id });
    req.id = result.insertId;
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const verifyUpdateData = async (req, resp, next) => {
  const { id } = req.params;
  if (Number.isNaN(parseInt(id, 10))) {
    resp.status(401).send("Id incorrecte");
  } else if (!(await News.findOneNewsById(id))) {
    resp.status(404).send(`News avec l'id ${id} non trouvée`);
  } else {
    next();
  }
};

const updateOneNewsById = async (req, resp, next) => {
  const { id } = req.params;
  // on recupère les champs remplis ou non ds le body
  const { title, actual_place, date_first, date_last, description, assets_id } = req.body;
  // on crée une const vide pour stocker les valeurs
  const newEvent = {};
  // si title est rempli, stocke le dans newEvent -> {title: xxx}
  if (title) {
    newEvent.title = title;
  }
  // si actual_place est rempli... etc
  if (actual_place) {
    newEvent.actual_place = actual_place;
  }
  if (date_first) {
    newEvent.date_first = date_first;
  }
  if (date_last) {
    newEvent.date_last = date_last;
  }
  if (description) {
    newEvent.description = description;
  }
  if (assets_id) {
    newEvent.assets_id = assets_id;
  }

  try {
    // on update la table avec l'objet newEvent : ca ne modifie que les champs remplis
    await News.updateOne(newEvent, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const deleteOneNews = async (req, resp) => {
  const { id } = req.params;
  try {
    const [result] = await News.deleteOneNewsById(id);
    if (result.affectedrows === 0) {
      resp.status(404).send(`News avec l'id ${id} non trouvée`);
    } else {
      resp.status(200).send(`News ${id} supprimée`);
    }
  } catch (err) {
    resp.status(500).send(`erreur lors de la suppression de l'admin : ${err.message}`);
  }
};

module.exports = { getAllNews, getOneNewsById, verifyUpdateData, updateOneNewsById, createOneNews, deleteOneNews };

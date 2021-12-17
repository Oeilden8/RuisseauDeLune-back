const { News } = require("../models");

const getAllNews = async (res, resp) => {
  try {
    const [results] = await News.findMany();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneNewsById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await News.findOneAdminById(id);
    if (result.length === 0) {
      resp.status(404).send(`Admin avec l'id ${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const verifyUpdateData = async (req, resp, next) => {
  const { id } = req.params;
  const { title, actual_place, date_first, date_last, description } = req.body;
  if (Number.isNaN(parseInt(id, 10))) {
    resp.status(401).send("Id incorrecte");
  } else if (!title || !actual_place || !date_first || !date_last || !description) {
    resp.status(404).send("Vous devez remplir au moins un champ");
  } else if (!(await News.findOneNewsById(id))) {
    resp.status(404).send(`News avec l'id ${id} non trouvée`);
  } else {
    next();
  }
};

const updateOneNewsById = async (req, resp, next) => {
  const { id } = req.params;
  const { title, actual_place, date_first, date_last, description } = req.body;
  const newEvent = {};
  if (title) {
    newEvent.title = title;
  } else if (actual_place) {
    newEvent.actual_place = actual_place;
  } else if (date_first) {
    newEvent.date_first = date_first;
  } else if (date_last) {
    newEvent.date_last = date_last;
  } else if (description) {
    newEvent.description = description;
  }

  try {
    await News.updateOne(newEvent, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

module.exports = { getAllNews, getOneNewsById, verifyUpdateData, updateOneNewsById };

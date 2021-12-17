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

module.exports = { getAllNews, getOneNewsById };

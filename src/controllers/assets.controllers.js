const { Assets } = require("../models");

const getAllAsset = async (_req, resp) => {
  try {
    const [results] = await Assets.findMany();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getAllImages = async (_req, resp) => {
  try {
    const [results] = await Assets.findManyImages();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getAllVideos = async (_req, resp) => {
  try {
    const [results] = await Assets.findManyVideos();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneAssetById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.asset_id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Assets.findOneAssetById(id);
    if (result.length === 0) {
      resp.status(404).send(`Image avec l' id${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOneAsset = async (req, resp, next) => {
  const { source, type } = req.body;
  if (type === "image" || type === "video") {
    try {
      const [result] = await Assets.createOne({ source, type });
      req.asset_id = result.insertId;
      next();
    } catch (err) {
      resp.status(500).send(err.message);
    }
  } else {
    resp.status(406).send("Entrer un type correct: image ou video");
  }
};

const deleteOneAsset = async (req, resp) => {
  const { id } = req.params;
  try {
    const [result] = await Assets.deleteOneById(id);
    if (result.affectedRows === 0) {
      resp.status(404).send(`l' image avec l'id ${id} non trouvé`);
    } else {
      resp.status(200).send(`l' image ${id} supprimé`);
    }
  } catch (err) {
    resp.status(500).send(`erreur lors de la suppression de l'image : ${err.message}`);
  }
};

module.exports = {
  getAllAsset,
  getAllImages,
  getAllVideos,
  getOneAssetById,
  createOneAsset,
  deleteOneAsset,
};

const { Asset } = require("../models");
const getAllAsset = async (_req, resp) => {
  try {
    const [results] = await Asset.findMany();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};
const getOneAssetById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Asset.findOneAssetById(id);
    if (result.length === 0) {
      resp.status(404).send(`Image avec l' id${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};
const createOneAsset= async (req, resp, next) => {
  try {
    const [result] = await Asset.createOne(req.body);
    req.id = result.insertId;
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};
const deleteOneAsset = async (req, resp) => {
  const { id } = req.params;
  try {
    const [result] = await Asset.deleteOneById(id);
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
  getOneAssetById,
  createOneAsset,
  deleteOneAsset,
};

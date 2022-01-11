const { SelectionAssets } = require("../models");

const getAllLinks = async (req, res) => {
  try {
    const [results] = await SelectionAssets.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneLinkById = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await SelectionAssets.findOneLinkById(id);
    if (result.length === 0) {
      res.status(404).send(`Lien intermédiaire avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
      next();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createOneLink = async (req, res, next) => {
  // recupère l'id de l'asset choisi via le front qui l'enverra ds le body ou recupère l'id de l'asset nouvellement créé
  const asset_id = req.body ? req.body : req.asset_id;
  // recupère l'id de l'event precedemment créé
  const { event_id } = req;

  if (asset_id && event_id) {
    try {
      await SelectionAssets.createOne({ asset_id, event_id });
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else if (event_id) {
    next();
  } else {
    res.status(404).send("erreur en récupérant les id");
  }
};

const deleteOneLink = async (req, res, next) => {
  const { events_id } = req.params;
  try {
    await SelectionAssets.deleteOneById(events_id);
    console.log(events_id);
    next();
  } catch (err) {
    res.status(500).send(`Erreur lors de la suppression`, err.message);
  }
};

module.exports = {
  getAllLinks,
  getOneLinkById,
  createOneLink,
  deleteOneLink,
};

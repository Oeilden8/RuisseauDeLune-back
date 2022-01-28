const { Assets } = require("../models");
const multer = require("multer");

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
  const id = req.params.id ? req.params.id : req.assets_id;
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

const uploadOneAsset = async (req, resp, next) => {
  const assetStorage = multer.diskStorage({
    // type: (_, asset, cb) => {
    //   cb(null, `${asset.originaltype}`);
    //   console.log({ type: req.asset });
    // },
    destination: (req, asset, cb) => {
      // notre dossier ou on stocke les assets -> pouvoir le choisir par type
      cb(null, "public/assets");
    },
    filename: (_, asset, cb) => {
      cb(null, `${asset.originalname}`);
    },
  });

  // on configure multer pour qu'il sauvegarde bien un seul fichier
  const upload = multer({ storage: assetStorage }).single("asset");
  upload(req, resp, (err) => {
    if (err) {
      resp.status(500).json(err);
    } else {
      resp.status(201).json({ filename: req.asset });
    }
  });
  next();
};

const createOneAsset = async (req, resp, next) => {
  let { source, type, name } = req.body;
  // recuperer les bonnes infos?
  if (req.asset.filename) {
    name = req.asset.filename;
    type = req.asset.type;
    source = req.asset.destination;
  }
  if (type === "image" || type === "video") {
    try {
      const [result] = await Assets.createOne({ source, type, name });
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
  uploadOneAsset,
  createOneAsset,
  deleteOneAsset,
};

const { Asset } = require("../models");
const getAllAssets = async (_req, resp) => {
  try {
    const [results] = await Asset.findMany();
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};



module.exports = {
  getAllAssets,
}
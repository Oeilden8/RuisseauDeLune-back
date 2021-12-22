const assetsRouter = require("express").Router();

const { assetsControllers } = require("../controllers");

assetsRouter.get("/", assetsControllers.getAllAsset);
assetsRouter.get("/:id", assetsControllers.getOneAssetById);
assetsRouter.delete("/:id", assetsControllers.deleteOneAsset);
assetsRouter.post("/", assetsControllers.createOneAsset, assetsControllers.getOneAssetById);

module.exports = assetsRouter;
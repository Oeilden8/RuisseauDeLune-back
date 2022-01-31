const assetsRouter = require("express").Router();

const { assetsControllers, authControllers } = require("../controllers");

assetsRouter.get("/", assetsControllers.getAllAsset);
assetsRouter.get("/:id", assetsControllers.getOneAssetById);
assetsRouter.get("/type/video", assetsControllers.getAllVideos);
assetsRouter.get("/type/image", assetsControllers.getAllImages);
assetsRouter.delete("/:id", authControllers.verifyToken, assetsControllers.deleteOneAsset);
assetsRouter.post("/", authControllers.verifyToken, assetsControllers.createOneAsset, assetsControllers.getOneAssetById);
assetsRouter.post(
  "/upload",
  authControllers.verifyToken,
  assetsControllers.uploadOneAsset,
  assetsControllers.createOneAsset,
  assetsControllers.getOneAssetById,
);

module.exports = assetsRouter;

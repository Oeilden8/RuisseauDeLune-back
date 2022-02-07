const newsRouter = require("express").Router();
const { newsControllers, authControllers } = require("../controllers");

newsRouter.get("/", newsControllers.getAllNews);
newsRouter.get("/:id", newsControllers.getOneNewsById);
newsRouter.post("/", authControllers.verifyToken, newsControllers.createOneNews, newsControllers.getOneNewsById);
newsRouter.put(
  "/:id",
  authControllers.verifyToken,
  newsControllers.verifyUpdateData,
  newsControllers.updateOneNewsById,
  newsControllers.getOneNewsById,
);
newsRouter.delete("/:id", authControllers.verifyToken, newsControllers.deleteOneNews);

module.exports = newsRouter;

const newsRouter = require("express").Router();
const { newsControllers } = require("../controllers");

newsRouter.get("/", newsControllers.getAllNews);
newsRouter.get("/:id", newsControllers.getOneNewsById);
newsRouter.post("/", newsControllers.createOneNews, newsControllers.getOneNewsById);
newsRouter.put("/:id", newsControllers.verifyUpdateData, newsControllers.updateOneNewsById, newsControllers.getOneNewsById);
newsRouter.delete("/:id", newsControllers.deleteOneNews);

module.exports = newsRouter;

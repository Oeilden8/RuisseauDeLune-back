const newsRouter = require("express").Router();
const { newsControllers } = require("../controllers");

newsRouter.put("/:id", newsControllers.verifyUpdateData, newsControllers.updateOneNewsById, newsControllers.getOneNewsById);

module.exports = newsRouter;

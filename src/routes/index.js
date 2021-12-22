const mainRouter = require("express").Router();
const adminsRouter = require("./admins.routes");
const newsRouter = require("./news.routes");

mainRouter.use("/admins", adminsRouter);
mainRouter.use("/news", newsRouter);

module.exports = mainRouter;

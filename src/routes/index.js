const mainRouter = require("express").Router();
const adminsRouter = require("./admins.routes");
const assetsRouter = require("./assets.routes");
const newsRouter = require("./news.routes");
const contactRouter = require("./contact.routes");

mainRouter.use("/admins", adminsRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/contact", contactRouter);

module.exports = mainRouter;

const mainRouter = require("express").Router();
const adminsRouter = require("./admins.routes");
const newsRouter = require("./news.routes");
const contactRouter = require("./contact.routes");

mainRouter.use("/admins", adminsRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/contact", contactRouter);

module.exports = mainRouter;

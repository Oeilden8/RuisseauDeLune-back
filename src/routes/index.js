const mainRouter = require("express").Router();
const adminsRouter = require("./admins.routes");
const eventsRouter = require("./events.routes");
const assetsRouter = require("./assets.routes");
const newsRouter = require("./news.routes");
const contactRouter = require("./contact.routes");
const authRouter = require("./auth.routes");

mainRouter.use("/admins", adminsRouter);
mainRouter.use("/events", eventsRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/contact", contactRouter);
mainRouter.use("/login", authRouter);

module.exports = mainRouter;

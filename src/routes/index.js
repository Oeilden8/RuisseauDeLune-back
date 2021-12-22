const mainRouter = require("express").Router();
const adminsRouter = require("./admins.routes");
const contactRouter = require("./contact.routes");

mainRouter.use("/contact", contactRouter);
mainRouter.use("/admins", adminsRouter);

module.exports = mainRouter;

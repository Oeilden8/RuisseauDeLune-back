const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const adminsRouter = require("./admins.routes");
const contactRouter = require("./contact.routes");

mainRouter.use("/contact", contactRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use("/admins", adminsRouter);

module.exports = mainRouter;

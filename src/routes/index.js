const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const adminsRouter = require("./admins.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/admins", adminsRouter);

module.exports = mainRouter;

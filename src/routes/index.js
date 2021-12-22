const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const adminsRouter = require("./admins.routes");
const assetsRouter = require("./assets.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/admins", adminsRouter);
mainRouter.use("/assets", assetsRouter);

module.exports = mainRouter;

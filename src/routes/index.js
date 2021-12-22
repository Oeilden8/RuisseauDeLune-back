const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const adminsRouter = require("./admins.routes");
const eventsRouter = require("./events.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/admins", adminsRouter);
mainRouter.use("/events", eventsRouter);

module.exports = mainRouter;

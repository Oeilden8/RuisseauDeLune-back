const eventsRouter = require("express").Router();

const { eventsControllers } = require("../controllers");

eventsRouter.get("/", eventsControllers.getAllEvents);
eventsRouter.get("/:id", eventsControllers.getOneEventById);
eventsRouter.get("/:type", eventsControllers.getOneType);

eventsRouter.post("/", eventsControllers.createOneEvent, eventsControllers.getOneEventById);

eventsRouter.put("/:id", eventsControllers.updateOneEventById, eventsControllers.getOneEventById);

eventsRouter.delete("/:id", eventsControllers.deleteOneEvent);

module.exports = eventsRouter;

const eventsRouter = require("express").Router();

const { eventsControllers, authControllers, linkControllers } = require("../controllers");

eventsRouter.get("/", eventsControllers.getAllEvents);
eventsRouter.get("/:id", eventsControllers.getOneEventById);
eventsRouter.get("/:type", eventsControllers.getOneType);

eventsRouter.post(
  "/",
  authControllers.verifyToken,
  eventsControllers.createOneEvent,
  linkControllers.createOneLink,
  eventsControllers.getOneEventById,
);

eventsRouter.put("/:id", authControllers.verifyToken, eventsControllers.updateOneEventById, eventsControllers.getOneEventById);

eventsRouter.delete("/:id", authControllers.verifyToken, eventsControllers.deleteOneEvent, linkControllers.deleteOneLink);

module.exports = eventsRouter;

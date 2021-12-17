// nomme la route
const adminsRouter = require("express").Router();

// importe toutes les fonctions présentes dans characters.controller via l'index de controllers
const { adminsControllers } = require("../controllers");

adminsRouter.get("/", adminsControllers.getAllAdmins);
adminsRouter.get("/:id", adminsControllers.getOneAdminById);

adminsRouter.post("/", adminsControllers.validateNewAdminData, adminsControllers.createOneAdmin, adminsControllers.getOneAdminById);

adminsRouter.delete("/:id", adminsControllers.deleteOneAdmin);

module.exports = adminsRouter;

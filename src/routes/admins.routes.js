// nomme la route
const adminsRouter = require("express").Router();

// importe toutes les fonctions présentes dans characters.controller via l'index de controllers
const { adminsControllers, authControllers } = require("../controllers");

adminsRouter.get("/", adminsControllers.getAllAdmins);
adminsRouter.get("/:id", adminsControllers.getOneAdminById);

adminsRouter.post(
  "/",
  authControllers.verifyToken,
  adminsControllers.validateNewAdminData,
  adminsControllers.createOneAdmin,
  adminsControllers.getOneAdminById,
);

adminsRouter.delete("/:id", authControllers.verifyToken, adminsControllers.deleteOneAdmin);

module.exports = adminsRouter;

const authRouter = require("express").Router();
const { adminsControllers, authControllers } = require("../controllers");

authRouter.get("/", authControllers.verifyToken, adminsControllers.getOneAdminById);
authRouter.post("/login", adminsControllers.verifyAdminLogin, authControllers.createToken);

module.exports = authRouter;

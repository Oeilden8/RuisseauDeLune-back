const contactRouter = require("express").Router();

const { contactControllers, authControllers } = require("../controllers");

contactRouter.get("/", contactControllers.getAllContacts);
contactRouter.get("/:id", contactControllers.getOneContactById);

contactRouter.put("/:id", authControllers.verifyToken, contactControllers.updateOneContactById, contactControllers.getOneContactById);

contactRouter.post("/", authControllers.verifyToken, contactControllers.createOneMoreContact, contactControllers.getOneContactById);

contactRouter.delete("/:id", authControllers.verifyToken, contactControllers.deleteOneContact);

module.exports = contactRouter;

const contactRouter = require("express").Router();

const { contactControllers } = require("../controllers");

contactRouter.get("/", contactControllers.getAllContacts);
contactRouter.get("/:id", contactControllers.getOneContactById);

contactRouter.put("/:id", contactControllers.updateOneContactById, contactControllers.getOneContactById);

contactRouter.post("/", contactControllers.createOneMoreContact, contactControllers.getOneContactById);

contactRouter.delete("/:id", contactControllers.deleteOneContact);

module.exports = contactRouter;

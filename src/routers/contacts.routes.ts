import { Router } from "express";
import { createContactController, deleteContactController, listContactsController, updateContactController } from "../controllers/contacts.controllers";

export const contactsRoutes: Router = Router()

contactsRoutes.post("", createContactController)
contactsRoutes.get("", listContactsController)
contactsRoutes.patch("/:id", updateContactController)
contactsRoutes.delete("/:id", deleteContactController)
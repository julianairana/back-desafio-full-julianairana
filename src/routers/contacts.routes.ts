import { Router } from "express";
import { createContactController, deleteContactController, listContactsController, retrieveContactController, updateContactController } from "../controllers/contacts.controllers";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { contactCreateSchema, updateContactSchema } from "../schemas/contacts.schemas";
import { ensureContactPermissionsMiddleware } from "../middlewares/ensureContactPermissions.middleware";
import { ensureContactExistMiddleware } from "../middlewares/ensureContactExist.middleware";

export const contactsRoutes: Router = Router()

contactsRoutes.post("", ensureTokenIsValidMiddleware, ensureDataIsValidMiddleware(contactCreateSchema),createContactController)

contactsRoutes.get("", ensureTokenIsValidMiddleware, listContactsController)

contactsRoutes.get("/:id", ensureTokenIsValidMiddleware, ensureContactPermissionsMiddleware,  retrieveContactController)

contactsRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureContactExistMiddleware, ensureContactPermissionsMiddleware, ensureDataIsValidMiddleware(updateContactSchema), updateContactController)

contactsRoutes.delete("/:id", ensureTokenIsValidMiddleware, ensureContactPermissionsMiddleware, deleteContactController)
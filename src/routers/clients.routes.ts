import { Router } from "express";
import { createClientController, deleteClientController, listClientsController, updateClientController } from "../controllers/clients.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientCreateSchema } from "../schemas/clients.schemas";

export const clientsRoutes: Router = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientCreateSchema), createClientController)
clientsRoutes.get("", listClientsController)
clientsRoutes.patch("/:id", updateClientController)
clientsRoutes.delete("/:id", deleteClientController)
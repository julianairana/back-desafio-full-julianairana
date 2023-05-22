import { Router } from "express";
import { createClientController, listClientsController } from "../controllers/clients.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientCreateSchema } from "../schemas/clients.schemas";

export const clientsRoutes: Router = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientCreateSchema), createClientController)
clientsRoutes.get("", listClientsController)
clientsRoutes.patch("/:id")
clientsRoutes.delete("/:id")
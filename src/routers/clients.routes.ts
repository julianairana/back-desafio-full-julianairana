import { Router } from "express";
import { createClientController } from "../controllers/clients.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientCreateSchema } from "../schemas/clients.schemas";

export const clientsRoutes: Router = Router()

clientsRoutes.post("", ensureDataIsValidMiddleware(clientCreateSchema), createClientController)
clientsRoutes.get("")
clientsRoutes.patch("/:id")
clientsRoutes.delete("/:id")
import { Router } from "express";
import { createClientController, deleteClientController, listClientsController, retrieveClientsController, updateClientController } from "../controllers/clients.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { clientCreateSchema, updateClientSchema } from "../schemas/clients.schemas";
import { ensureEmailExistsMiddleware } from "../middlewares/ensureEmailExists.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureValidClientMiddleware } from "../middlewares/ensureValidClient.middleware";
import { ensureClientExistMiddleware } from "../middlewares/ensureClientExistMiddleware";

export const clientsRoutes: Router = Router()

clientsRoutes.post("", ensureEmailExistsMiddleware, ensureDataIsValidMiddleware(clientCreateSchema), createClientController)

clientsRoutes.get("", ensureTokenIsValidMiddleware, listClientsController)

clientsRoutes.get("/:id", ensureTokenIsValidMiddleware, ensureClientExistMiddleware, retrieveClientsController)

clientsRoutes.patch("/:id", ensureTokenIsValidMiddleware, ensureClientExistMiddleware, ensureValidClientMiddleware, ensureDataIsValidMiddleware(updateClientSchema), updateClientController)

clientsRoutes.delete("/:id", ensureTokenIsValidMiddleware,
ensureClientExistMiddleware, ensureValidClientMiddleware, deleteClientController)
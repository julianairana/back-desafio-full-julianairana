"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRoutes = void 0;
const express_1 = require("express");
const clients_controllers_1 = require("../controllers/clients.controllers");
const ensureDataIsValid_middleware_1 = require("../middlewares/ensureDataIsValid.middleware");
const clients_schemas_1 = require("../schemas/clients.schemas");
const ensureEmailExists_middleware_1 = require("../middlewares/ensureEmailExists.middleware");
const ensureTokenIsValid_middleware_1 = require("../middlewares/ensureTokenIsValid.middleware");
const ensureValidClient_middleware_1 = require("../middlewares/ensureValidClient.middleware");
const ensureClientExistMiddleware_1 = require("../middlewares/ensureClientExistMiddleware");
exports.clientsRoutes = (0, express_1.Router)();
exports.clientsRoutes.post("", ensureEmailExists_middleware_1.ensureEmailExistsMiddleware, (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(clients_schemas_1.clientCreateSchema), clients_controllers_1.createClientController);
exports.clientsRoutes.get("", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, clients_controllers_1.listClientsController);
exports.clientsRoutes.get("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureClientExistMiddleware_1.ensureClientExistMiddleware, ensureValidClient_middleware_1.ensureValidClientMiddleware, clients_controllers_1.retrieveClientsController);
exports.clientsRoutes.patch("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureClientExistMiddleware_1.ensureClientExistMiddleware, ensureValidClient_middleware_1.ensureValidClientMiddleware, (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(clients_schemas_1.updateClientSchema), clients_controllers_1.updateClientController);
exports.clientsRoutes.delete("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureClientExistMiddleware_1.ensureClientExistMiddleware, ensureValidClient_middleware_1.ensureValidClientMiddleware, clients_controllers_1.deleteClientController);
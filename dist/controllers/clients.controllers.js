"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClientController = exports.updateClientController = exports.retrieveClientsController = exports.listClientsController = exports.createClientController = void 0;
const createClient_service_1 = require("../services/clients/createClient.service");
const listClient_service_1 = require("../services/clients/listClient.service");
const updateClient_service_1 = require("../services/clients/updateClient.service");
const deleteClient_service_1 = require("../services/clients/deleteClient.service");
const retrieveClient_service_1 = require("../services/clients/retrieveClient.service");
const createClientController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const clientData = request.body;
    const newClient = yield (0, createClient_service_1.createClientService)(clientData);
    return response.status(201).json(newClient);
});
exports.createClientController = createClientController;
const listClientsController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield (0, listClient_service_1.listClientsService)();
    return response.json(clients);
});
exports.listClientsController = listClientsController;
const retrieveClientsController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id);
    const { client, contact } = yield (0, retrieveClient_service_1.retrieveClientService)(id);
    const clientWithContacts = {
        client: client,
        contacts: contact,
    };
    return response.json(clientWithContacts);
});
exports.retrieveClientsController = retrieveClientsController;
const updateClientController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const clientData = request.body;
    const idClient = parseInt(request.params.id);
    const updatedClient = yield (0, updateClient_service_1.updateClientService)(clientData, idClient);
    return response.json(updatedClient);
});
exports.updateClientController = updateClientController;
const deleteClientController = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteClient_service_1.deleteClientService)(parseInt(request.params.id));
    return response.status(204).send();
});
exports.deleteClientController = deleteClientController;

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
exports.updateClientService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const clients_schemas_1 = require("../../schemas/clients.schemas");
const updateClientService = (newClientData, idClient) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(newClientData).length === 0) {
        throw new errors_1.AppError("Invalid data.", 400);
    }
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const oldClientData = yield clientRepository.findOneBy({
        id: idClient
    });
    const client = clientRepository.create(Object.assign(Object.assign({}, oldClientData), newClientData));
    yield clientRepository.save(client);
    const updatedClient = clients_schemas_1.returnClientSchema.parse(client);
    return updatedClient;
});
exports.updateClientService = updateClientService;

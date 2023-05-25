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
exports.createContactService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const contacts_schemas_1 = require("../../schemas/contacts.schemas");
const createContactService = (contactData, clientId) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const client = yield clientRepository.findOneBy({
        id: clientId,
    });
    if (!client) {
        throw new errors_1.AppError("Client not found", 404);
    }
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const contact = contactRepository.create(Object.assign(Object.assign({}, contactData), { client: client }));
    yield contactRepository.save(contact);
    return contacts_schemas_1.returnContactSchema.parse(contact);
});
exports.createContactService = createContactService;

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
exports.retrieveContactService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const contacts_schemas_1 = require("../../schemas/contacts.schemas");
const retrieveContactService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const findContact = yield contactRepository.findOne({
        where: {
            id: id,
        },
        relations: {
            client: true,
        },
    });
    const contact = contacts_schemas_1.returnContactClientSchema.parse(findContact);
    return contact;
});
exports.retrieveContactService = retrieveContactService;

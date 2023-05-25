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
exports.updateContactService = void 0;
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
const contacts_schemas_1 = require("../../schemas/contacts.schemas");
const updateContactService = (newContactData, idContact) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(newContactData).length === 0) {
        throw new errors_1.AppError("Invalid data.", 400);
    }
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const oldContactData = yield contactRepository.findOneBy({
        id: idContact
    });
    const contact = contactRepository.create(Object.assign(Object.assign({}, oldContactData), newContactData));
    yield contactRepository.save(contact);
    const updatedContact = contacts_schemas_1.returnContactSchema.parse(contact);
    return updatedContact;
});
exports.updateContactService = updateContactService;

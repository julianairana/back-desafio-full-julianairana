"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactSchema = exports.returnAllContactSchema = exports.returnContactClientSchema = exports.returnContactSchema = exports.contactCreateSchema = void 0;
const zod_1 = require("zod");
const contact_entity_1 = require("../entities/contact.entity");
const clients_schemas_1 = require("./clients.schemas");
exports.contactCreateSchema = zod_1.z.object({
    fullName: zod_1.z.string().max(45),
    email: zod_1.z.string().email().max(45).nullish(),
    phone: zod_1.z.string().max(45),
    gender: zod_1.z.nativeEnum(contact_entity_1.GenderContact)
});
exports.returnContactSchema = exports.contactCreateSchema.extend({
    id: zod_1.z.number(),
    dateRegister: zod_1.z.date().optional(),
});
exports.returnContactClientSchema = exports.returnContactSchema.extend({
    client: clients_schemas_1.returnClientSchema,
});
exports.returnAllContactSchema = exports.returnContactSchema.array();
exports.updateContactSchema = exports.contactCreateSchema.partial();

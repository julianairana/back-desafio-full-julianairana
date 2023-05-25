"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSchema = exports.returnAllClientSchema = exports.returnClientSchema = exports.clientCreateSchema = void 0;
const zod_1 = require("zod");
const clients_entity_1 = require("../entities/clients.entity");
exports.clientCreateSchema = zod_1.z.object({
    name: zod_1.z.string().max(45),
    email: zod_1.z.string().email().max(45),
    password: zod_1.z.string().max(120),
    phone: zod_1.z.string().max(45),
    image: zod_1.z.string().nullish(),
    gender: zod_1.z.nativeEnum(clients_entity_1.GenderClient),
});
exports.returnClientSchema = exports.clientCreateSchema.extend({
    id: zod_1.z.number(),
    dateRegister: zod_1.z.date().optional(),
}).omit({ password: true });
exports.returnAllClientSchema = exports.returnClientSchema.array();
exports.updateClientSchema = exports.clientCreateSchema.partial();

import { z } from "zod";
import { GenderContact } from "../entities/contact.entity";
import { returnClientSchema } from "./clients.schemas";

export const contactCreateSchema = z.object({

    fullName: z.string().max(45),

    email: z.string().email().max(45),

    phone: z.string().max(45),

    gender: z.nativeEnum(GenderContact)
})

export const returnContactSchema = contactCreateSchema.extend({
    id: z.number(),

    dateRegister: z.date().optional(),
});

export const returnContactClientSchema = returnContactSchema.extend({
    client: returnClientSchema,
});

export const returnAllContactSchema = returnContactSchema.array();

export const updateContactSchema = contactCreateSchema.partial();
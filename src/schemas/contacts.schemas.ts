import { z } from "zod";
import { GenderContact } from "../entities/contact.entity";

export const contactCreateSchema = z.object({

    fullname: z.string().max(45),

    email: z.string().email().max(45),

    phone: z.string().max(45),

    gender: z.nativeEnum(GenderContact)
})

export const returnContactSchema = contactCreateSchema.extend({
    id: z.number(),

    dateRegister: z.string().datetime(),
});

export const returnAllContactSchema = returnContactSchema.array();

export const updateContactSchema = contactCreateSchema.partial();
import { z } from "zod";
import { GenderClient } from "../entities/clients.entity";

export const clientCreateSchema = z.object({

    name: z.string().max(45),

    email: z.string().email().max(45),

    password: z.string().max(120),

    phone: z.string().max(45),

    gender: z.nativeEnum(GenderClient),
})

export const returnClientSchema = clientCreateSchema.extend({
    id: z.number(),

    dateRegister: z.date().optional(),
    
}).omit({password: true})

export const returnAllClientSchema = returnClientSchema.array();

export const updateClientSchema = clientCreateSchema.partial();
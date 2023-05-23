import { z } from "zod";
import { contactCreateSchema, returnAllContactSchema, returnContactSchema } from "../schemas/contacts.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Contact } from "../entities";

export type IContact = z.infer<typeof contactCreateSchema>
export type IContactReturn = z.infer<typeof returnContactSchema>
export type IContactAllReturn = z.infer<typeof returnAllContactSchema>
export type IContactRepo = Repository<Contact>;
export type IContactUpdate = DeepPartial<IContact>
import { z } from "zod";
import { clientCreateSchema, returnAllClientSchema, returnClientSchema } from "../schemas/clients.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Client } from "../entities";

export type IClient = z.infer<typeof clientCreateSchema>
export type IClientReturn = z.infer<typeof returnClientSchema>
export type IClientAllReturn = z.infer<typeof returnAllClientSchema>
export type IClientRepo = Repository<Client>;
export type IClientUpdate = DeepPartial<IClient>
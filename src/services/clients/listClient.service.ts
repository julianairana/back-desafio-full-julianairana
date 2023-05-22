import { Repository } from "typeorm";
import { IClientAllReturn } from "../../interfaces/clients.interfaces";
import { Client } from "../../entities";
import { AppDataSource } from "../../data-source"
import { returnAllClientSchema } from "../../schemas/clients.schemas";

export const listClientsService = async (): Promise<IClientAllReturn> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const findClients: Array<Client> = await clientRepository.find()

    const clients = returnAllClientSchema.parse(findClients)

    return clients

}
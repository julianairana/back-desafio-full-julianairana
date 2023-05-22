import { AppDataSource } from "../../data-source"
import { Client } from "../../entities"
import { IClient, IClientRepo, IClientReturn } from "../../interfaces/clients.interfaces"
import { returnClientSchema } from "../../schemas/clients.schemas"

export const createClientService = async (clientData: IClient): Promise<IClientReturn> => {

    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)

    const client: Client = clientRepository.create(clientData)

    await clientRepository.save(client)
    
    const newClient = returnClientSchema.parse(client)
    
    return newClient

}
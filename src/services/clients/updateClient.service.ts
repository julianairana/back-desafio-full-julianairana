import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientRepo, IClientReturn, IClientUpdate } from "../../interfaces/clients.interfaces";
import { returnClientSchema } from "../../schemas/clients.schemas";

export const updateClientService = async (newClientData: IClientUpdate, idClient: number): Promise<IClientReturn> => {

    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)

    const oldClientData = await clientRepository.findOneBy({
        id: idClient
    })

    const client = clientRepository.create({
        ...oldClientData,
        ...newClientData
    })

    await clientRepository.save(client)

    const updatedClient = returnClientSchema.parse(client)

    return updatedClient

}
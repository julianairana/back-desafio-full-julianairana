import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientRepo } from "../../interfaces/clients.interfaces";

export const deleteClientService = async (idClient: number): Promise<void> => {

    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOne({
        where: {
            id: idClient
        }
    })

    await clientRepository.remove(client!)

}
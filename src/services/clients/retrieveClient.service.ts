import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientRepo, IContactClientReturn } from "../../interfaces/clients.interfaces";
import { returnClientSchema } from "../../schemas/clients.schemas";

export const retrieveClientService = async (id: string): Promise<IContactClientReturn> => {
  
    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)
  
    const findClient = await clientRepository.findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        contact: true,
      },
    })
  
    const client = returnClientSchema.parse(findClient!)
  
    const contact = findClient ? findClient.contact : []
  
    return { client, contact }

  }
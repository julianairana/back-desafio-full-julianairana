import { AppDataSource } from "../../data-source";
import { Client, Contact } from "../../entities";
import { AppError } from "../../errors";
import { IClientRepo } from "../../interfaces/clients.interfaces";
import { IContact, IContactRepo, IContactReturn } from "../../interfaces/contacts.interfaces";
import { returnContactSchema } from "../../schemas/contacts.schemas";

export const createContactService = async (contactData: IContact, clientId: number): Promise<IContactReturn> => {

    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({
        id: clientId,
      })
    
      if (!client) {
        throw new AppError("Client not found", 404)
      }
    
      const contactRepository: IContactRepo = AppDataSource.getRepository(Contact)
    
      const contact: Contact = contactRepository.create({
        ...contactData,
        client: client!,
      })
    
      await contactRepository.save(contact)
    
      return returnContactSchema.parse(contact)

}
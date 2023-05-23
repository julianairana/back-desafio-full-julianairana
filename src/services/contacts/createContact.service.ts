import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContact, IContactRepo, IContactReturn } from "../../interfaces/contacts.interfaces";
import { returnContactSchema } from "../../schemas/contacts.schemas";

export const createContactService = async (contactData: IContact): Promise<IContactReturn> => {

    const contactRepository: IContactRepo = AppDataSource.getRepository(Contact)

    const contact: Contact = contactRepository.create(contactData)

    await contactRepository.save(contact)
    
    const newContact = returnContactSchema.parse(contact)
    
    return newContact

}
import { Repository } from "typeorm";
import { IContactAllReturn } from "../../interfaces/contacts.interfaces";
import { Contact } from "../../entities";
import { AppDataSource } from "../../data-source";
import { returnAllContactSchema } from "../../schemas/contacts.schemas";

export const listContactsService = async (): Promise<IContactAllReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const findContacts: Array<Contact> = await contactRepository.find()

    const contacts = returnAllContactSchema.parse(findContacts)

    return contacts

}
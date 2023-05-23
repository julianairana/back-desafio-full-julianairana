import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactRepo } from "../../interfaces/contacts.interfaces";

export const deleteContactService = async (idContact: number): Promise<void> => {

    const contactRepository: IContactRepo = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOne({
        where: {
            id: idContact
        }
    })

    await contactRepository.remove(contact!)

}
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { AppError } from "../../errors";
import { IContactRepo, IContactReturn, IContactUpdate } from "../../interfaces/contacts.interfaces";
import { returnContactSchema } from "../../schemas/contacts.schemas";

export const updateContactService = async (newContactData: IContactUpdate, idContact: number): Promise<IContactReturn> => {

    if (Object.keys(newContactData).length === 0) {
        throw new AppError("Invalid data.", 400)
      }

    const contactRepository: IContactRepo = AppDataSource.getRepository(Contact)

    const oldContactData = await contactRepository.findOneBy({
        id: idContact
    })

    const contact = contactRepository.create({
        ...oldContactData,
        ...newContactData
    })

    await contactRepository.save(contact)

    const updatedContact = returnContactSchema.parse(contact)

    return updatedContact

}
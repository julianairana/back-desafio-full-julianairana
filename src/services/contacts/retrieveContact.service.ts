import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactRepo, IContactReturn } from "../../interfaces/contacts.interfaces";
import { returnContactClientSchema } from "../../schemas/contacts.schemas";


export const retrieveContactService = async (
  id: number
): Promise<IContactReturn> => {
  const contactRepository: IContactRepo = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      client: true,
    },
  });

  const contact = returnContactClientSchema.parse(findContact!);

  return contact;
};
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";

export const ensureContactPermissionsMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const contactId = parseInt(request.params.id);
  const clientId = request.client.id;

  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({
    where: {
      id: contactId,
      client: {
        id: parseInt(clientId),
      },
    },
  });

  if (!findContact) {
    return response
      .status(401)
      .json({ message: "You don`t have permissions." });
  }

  return next()
};
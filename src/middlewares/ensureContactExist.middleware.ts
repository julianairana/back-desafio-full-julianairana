import { Request, Response, NextFunction } from "express";
import { IContactRepo } from "../interfaces/contacts.interfaces";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../errors";

export const ensureContactExistMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const contactRepository: IContactRepo = AppDataSource.getRepository(Contact);
  
    const contactFind = await contactRepository.findOne({
      where: {
        id: parseInt(request.params.id),
      },
    });
  
    if (!contactFind) {
      throw new AppError("Contact not found.", 404);
    }
    return next();
  };
  
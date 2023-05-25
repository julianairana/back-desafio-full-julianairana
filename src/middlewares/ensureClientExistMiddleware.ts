import { Request, Response, NextFunction } from "express";
import { IClientRepo } from "../interfaces/clients.interfaces";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors";

export const ensureClientExistMiddleware = async (request: Request, response: Response, next: NextFunction
  ): Promise<void> => {
    const clientRepository: IClientRepo = AppDataSource.getRepository(Client);
  
    const clientFind = await clientRepository.findOne({
      where: {
        id: parseInt(request.params.id) || parseInt(request.client.id),
      },
    });
  
    if (!clientFind) {
      throw new AppError("Client not found!", 404);
    }
    return next();
  };
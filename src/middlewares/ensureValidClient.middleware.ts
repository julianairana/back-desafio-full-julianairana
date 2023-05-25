import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";

export const ensureValidClientMiddleware = async (request: Request, response: Response, next: NextFunction) => {

    const clientId = request.client.id;
    const requestClientId = parseInt(request.params.id);
  
    if (parseInt(clientId) !== requestClientId) {
      return response
        .status(401)
        .json({ message: "You don`t have permissions." });
    }
  
    const clientRepository = AppDataSource.getRepository(Client);
  
    const client = await clientRepository.findOne({
      where: {
        id: parseInt(clientId),
      },
      relations: {
        contact: true,
      },
    });
  
    if (!client) {
      return response.status(404).json({ message: "Client not found." });
    }

    return next()
};

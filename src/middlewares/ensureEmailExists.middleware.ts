import { Request, Response, NextFunction} from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors";

export const ensureEmailExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client)

    const emailClient = await clientRepository.findOne({
        where: {
            email: request.body.email
        }
    })

    if(!!emailClient){
        throw new AppError("Email already exists", 409)
    }

    return next()
};

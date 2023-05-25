import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { AppError } from "../../errors";
import "dotenv/config";
import { ILogin } from "../../interfaces/login.interfaces";
import { IClientRepo } from "../../interfaces/clients.interfaces";

export const createLoginService = async (loginData: ILogin): Promise<string> => {

    const clientRepository: IClientRepo = AppDataSource.getRepository(Client)

    const client: Client | null = await clientRepository.findOneBy({
        email: loginData.email
    })

    if(!client){
        throw new AppError("Invalid credentials", 401)
    }

    const passwordMatch = await compare(loginData.password, client.password)

    if(!passwordMatch){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = jwt.sign(
        {
            email: client.email
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: String(client.id)
        }
    )

    return token
}

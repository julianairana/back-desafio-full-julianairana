import { Request, Response } from "express";
import { createLoginService } from "../services/login/createLogin.service";
import { ILogin } from "../interfaces/login.interfaces";

export const createLoginController = async (request: Request, response: Response): Promise<Response> => {

    const loginData: ILogin = request.body

    const token = await createLoginService(loginData)

    return response.json({
        token: token
    })

}
import { Request, Response } from "express";
import { IClient } from "../interfaces/clients.interfaces";
import { createClientService } from "../services/clients/createClient.service";

export const createClientController = async (request: Request, response: Response) => {

    const clientData: IClient = request.body

    const newClient = await createClientService(clientData)

    return response.status(201).json(newClient)

}
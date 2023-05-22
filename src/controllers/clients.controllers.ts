import { Request, Response } from "express";
import { IClient } from "../interfaces/clients.interfaces";
import { createClientService } from "../services/clients/createClient.service";
import { listClientsService } from "../services/clients/listClient.service";

export const createClientController = async (request: Request, response: Response) => {

    const clientData: IClient = request.body

    const newClient = await createClientService(clientData)

    return response.status(201).json(newClient)
}

export const listClientsController = async (request: Request, response: Response) => {

    const clients = await listClientsService()

    return response.json(clients)
  }
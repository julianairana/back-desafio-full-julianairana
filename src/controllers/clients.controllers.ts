import { Request, Response } from "express";
import { IClient, IClientUpdate } from "../interfaces/clients.interfaces";
import { createClientService } from "../services/clients/createClient.service";
import { listClientsService } from "../services/clients/listClient.service";
import { updateClientService } from "../services/clients/updateClient.service";
import { deleteClientService } from "../services/clients/deleteClient.service";
import { retrieveClientService } from "../services/clients/retrieveClient.service";

export const createClientController = async (request: Request, response: Response) => {

    const clientData: IClient = request.body

    const newClient = await createClientService(clientData)

    return response.status(201).json(newClient)
}

export const listClientsController = async (request: Request, response: Response) => {

    const clients = await listClientsService()

    return response.json(clients)
}

export const retrieveClientsController = async (request: Request,response: Response
  ) => {
    const id = parseInt(request.params.id);
    const { client, contact } = await retrieveClientService(id);
  
    const clientWithContacts = {
      client: client,
      contacts: contact,
    };
  
    return response.json(clientWithContacts);
  };

export const updateClientController = async (request: Request, response: Response) => {

    const clientData: IClientUpdate = request.body
    const idClient = parseInt(request.params.id)

    const updatedClient = await updateClientService(clientData, idClient)

    return response.json(updatedClient)
}

export const deleteClientController = async (request: Request, response: Response) => {

    await deleteClientService(parseInt(request.params.id))

    return response.status(204).send()
}
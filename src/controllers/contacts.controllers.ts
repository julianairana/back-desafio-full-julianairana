import { Request, Response } from "express";
import { IContact, IContactUpdate } from "../interfaces/contacts.interfaces";
import { createContactService } from "../services/contacts/createContact.service";
import { listContactsService } from "../services/contacts/listContact.service";
import { updateContactService } from "../services/contacts/updateContact.service";
import { deleteContactService } from "../services/contacts/deleteContact.service";
import { retrieveContactService } from "../services/contacts/retrieveContact.service";

export const createContactController = async (request: Request, response: Response) => {

    const contactData: IContact = request.body
    const clientId = parseInt(request.client.id)

    const newContact = await createContactService(contactData, clientId)

    return response.status(201).json(newContact)
}

export const listContactsController = async (request: Request, response: Response) => {

    const contacts = await listContactsService()

    return response.json(contacts)
}

export const retrieveContactController = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const contact = await retrieveContactService(id);
  
    return response.json(contact);
}

export const updateContactController = async (request: Request, response: Response) => {

    const contactData: IContactUpdate = request.body
    const idContact = parseInt(request.params.id)

    const updatedContact = await updateContactService(contactData, idContact)

    return response.json(updatedContact)
}

export const deleteContactController = async (request: Request, response: Response) => {

    await deleteContactService(parseInt(request.params.id))

    return response.status(204).send()
}
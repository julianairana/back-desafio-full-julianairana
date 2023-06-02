import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { AppDataSource } from "../data-source";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { returnClientSchema } from "../schemas/clients.schemas";
import { Client } from "../entities";

export const routesReport: Router = Router();
routesReport.get(
  "",
  ensureTokenIsValidMiddleware,
  async (request: Request, response: Response) => {

    try {
      if (!request.client) {
        return response.status(401).json({ message: "Cliente não autenticado." });
      }
      const clientId = request.client.id;
      const clientRepository = AppDataSource.getRepository(Client);
      const queryBuilder = clientRepository
        .createQueryBuilder("client")
        .leftJoinAndSelect("client.contact", "contact")
        .where("client.id = :clientId", { clientId });

      const client = await queryBuilder.getOne();
      if (!client) {
        return response.status(404).json({ message: "Cliente não encontrado." });
      }
      const doc = new PDFDocument();
      doc
        .fontSize(18)
        .text("Lista de Contatos", { align: "center" })
        .moveDown();
      const validateClient = returnClientSchema.parse(client);
      doc
        .fontSize(12)
        .text(
          ` Cliente: ${validateClient.name}, E-mail:${validateClient.email}, Telefone: ${validateClient.phone}, Gender: ${validateClient.gender}, Data: ${validateClient.dateRegister}, `
        )
        .moveDown();
      doc.fontSize(14).text("Contatos:", { align: "left" }).moveDown();
      client.contact.forEach((contact) => {
        doc
          .fontSize(10)
          .text(
            ` Nome: ${contact.fullName}, E-mail: ${contact.email}, Telefone: ${contact.phone}, Gender: ${contact.gender}, Data: ${contact.dateRegister}`
          );
      });
      doc.end();
      response.setHeader("Content-Type", "application/pdf");
      doc.pipe(response);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao gerar o relatório." });
    }
  }
);







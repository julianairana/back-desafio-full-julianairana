import { Router, Request, Response } from "express";
import PDFDocument from "pdfkit";
import { Client } from "../entities";
import { AppDataSource } from "../data-source";
import { returnClientSchema } from "../schemas/clients.schemas";

export const routesReport: Router = Router();

routesReport.get("", async (request: Request, response: Response) => {

  try {
    const clientRepository = AppDataSource.getRepository(Client);
    const users = await clientRepository.find({
      relations: {
        contact: true,
      },
    })

    const doc = new PDFDocument();
    doc
      .fontSize(18)
      .fillColor("green").text("Customer Report", { align: "center", underline: true })
      .moveDown()

    users.forEach((client, index) => {
      const validatedClient = returnClientSchema.parse(client)
      doc
        .fontSize(12)
        .fillColor("black").text(
          `Client ${index + 1}: 
          Name:${validatedClient.name}, 
          E-mail:${validatedClient.email}, 
          Contact:${validatedClient.phone}, 
          Gender:${validatedClient.gender}, 
          Date:${validatedClient.dateRegister}`
        )

        client.contact.forEach((contact) => {
        doc
          .fontSize(10)
          .text(
            `   - Contact: 
            Name:${contact.fullName}, 
            E-mail:${contact.email == null ? "not informed"  : contact.email}, 
            Gender:${validatedClient.gender}, 
            Contact:${contact.phone}, 
            Date:${validatedClient.dateRegister}`
          )
      })
      doc.moveDown()
    })

    doc.end()
    response.setHeader("Content-Type", "application/pdf");
    doc.pipe(response)
    
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: "Erro ao gerar o relatório." });
  }

})
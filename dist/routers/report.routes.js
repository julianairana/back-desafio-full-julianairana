"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesReport = void 0;
const express_1 = require("express");
const pdfkit_1 = __importDefault(require("pdfkit"));
const entities_1 = require("../entities");
const data_source_1 = require("../data-source");
const clients_schemas_1 = require("../schemas/clients.schemas");
exports.routesReport = (0, express_1.Router)();
exports.routesReport.get("", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
        const users = yield clientRepository.find({
            relations: {
                contact: true,
            },
        });
        const doc = new pdfkit_1.default();
        doc
            .fontSize(18)
            .fillColor("green").text("Customer Report", { align: "center", underline: true })
            .moveDown();
        users.forEach((client, index) => {
            const validatedClient = clients_schemas_1.returnClientSchema.parse(client);
            doc
                .fontSize(12)
                .fillColor("black").text(`Client ${index + 1}: 
          Name:${validatedClient.name}, 
          E-mail:${validatedClient.email}, 
          Contact:${validatedClient.phone}, 
          Gender:${validatedClient.gender}, 
          Date:${validatedClient.dateRegister}`);
            client.contact.forEach((contact) => {
                doc
                    .fontSize(10)
                    .text(`   - Contact: 
            Name:${contact.fullName}, 
            E-mail:${contact.email == null ? "not informed" : contact.email}, 
            Gender:${validatedClient.gender}, 
            Contact:${contact.phone}, 
            Date:${validatedClient.dateRegister}`);
            });
            doc.moveDown();
        });
        doc.end();
        response.setHeader("Content-Type", "application/pdf");
        doc.pipe(response);
    }
    catch (error) {
        console.error(error);
        response.status(500).json({ message: "Erro ao gerar o relatório." });
    }
}));

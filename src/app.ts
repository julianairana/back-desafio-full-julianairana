import cors from "cors";
import 'express-async-errors';
import express, { Application } from "express";
import { clientsRoutes } from "./routers/clients.routes";
import { contactsRoutes } from "./routers/contacts.routes";
import { handleErrors } from './errors';

const app: Application = express()

app.use(cors());
app.use(express.json())

app.use("/clients", clientsRoutes)
app.use("/contacts", contactsRoutes)

app.use(handleErrors)

export default app;
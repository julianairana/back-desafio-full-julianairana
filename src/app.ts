import cors from "cors";
import 'express-async-errors';
import express, { Application } from "express";
import { clientsRoutes } from "./routers/clients.routes";
import { contactsRoutes } from "./routers/contacts.routes";
import { handleErrors } from './errors';
import { loginRoutes } from "./routers/login.routes";
import { routesReport } from "./routers/report.routes";

const app: Application = express()

app.use(cors());
app.use(express.json())

app.use("/clients", clientsRoutes)
app.use("/login", loginRoutes)
app.use("/contacts", contactsRoutes)
app.use("/report", routesReport)

app.use(handleErrors)


export default app;
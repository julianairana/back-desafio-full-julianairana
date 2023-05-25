"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const clients_routes_1 = require("./routers/clients.routes");
const contacts_routes_1 = require("./routers/contacts.routes");
const errors_1 = require("./errors");
const login_routes_1 = require("./routers/login.routes");
const report_routes_1 = require("./routers/report.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/clients", clients_routes_1.clientsRoutes);
app.use("/login", login_routes_1.loginRoutes);
app.use("/contacts", contacts_routes_1.contactsRoutes);
app.use("/report", report_routes_1.routesReport);
app.use(errors_1.handleErrors);
exports.default = app;
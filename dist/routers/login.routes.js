"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const ensureDataIsValid_middleware_1 = require("../middlewares/ensureDataIsValid.middleware");
const login_schemas_1 = require("../schemas/login.schemas");
exports.loginRoutes = (0, express_1.Router)();
exports.loginRoutes.post("", (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(login_schemas_1.createLoginSchema), login_controllers_1.createLoginController);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsRoutes = void 0;
const express_1 = require("express");
const contacts_controllers_1 = require("../controllers/contacts.controllers");
const ensureTokenIsValid_middleware_1 = require("../middlewares/ensureTokenIsValid.middleware");
const ensureDataIsValid_middleware_1 = require("../middlewares/ensureDataIsValid.middleware");
const contacts_schemas_1 = require("../schemas/contacts.schemas");
const ensureContactPermissions_middleware_1 = require("../middlewares/ensureContactPermissions.middleware");
const ensureContactExist_middleware_1 = require("../middlewares/ensureContactExist.middleware");
exports.contactsRoutes = (0, express_1.Router)();
exports.contactsRoutes.post("", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(contacts_schemas_1.contactCreateSchema), contacts_controllers_1.createContactController);
exports.contactsRoutes.get("", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, contacts_controllers_1.listContactsController);
exports.contactsRoutes.get("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureContactExist_middleware_1.ensureContactExistMiddleware, ensureContactPermissions_middleware_1.ensureContactPermissionsMiddleware, contacts_controllers_1.retrieveContactController);
exports.contactsRoutes.patch("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureContactExist_middleware_1.ensureContactExistMiddleware, ensureContactPermissions_middleware_1.ensureContactPermissionsMiddleware, (0, ensureDataIsValid_middleware_1.ensureDataIsValidMiddleware)(contacts_schemas_1.updateContactSchema), contacts_controllers_1.updateContactController);
exports.contactsRoutes.delete("/:id", ensureTokenIsValid_middleware_1.ensureTokenIsValidMiddleware, ensureContactPermissions_middleware_1.ensureContactPermissionsMiddleware, contacts_controllers_1.deleteContactController);
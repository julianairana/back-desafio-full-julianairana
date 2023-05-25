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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureContactPermissionsMiddleware = void 0;
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const ensureContactPermissionsMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = parseInt(request.params.id);
    const clientId = request.client.id;
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const findContact = yield contactRepository.findOne({
        where: {
            id: contactId,
            client: {
                id: parseInt(clientId),
            },
        },
    });
    if (!findContact) {
        return response
            .status(401)
            .json({ message: "You don`t have permissions." });
    }
    return next();
});
exports.ensureContactPermissionsMiddleware = ensureContactPermissionsMiddleware;

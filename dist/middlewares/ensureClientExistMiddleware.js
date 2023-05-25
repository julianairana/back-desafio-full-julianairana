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
exports.ensureClientExistMiddleware = void 0;
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const ensureClientExistMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(entities_1.Client);
    const clientFind = yield clientRepository.findOne({
        where: {
            id: parseInt(request.params.id) || parseInt(request.client.id),
        },
    });
    if (!clientFind) {
        throw new errors_1.AppError("Client not found!", 404);
    }
    return next();
});
exports.ensureClientExistMiddleware = ensureClientExistMiddleware;

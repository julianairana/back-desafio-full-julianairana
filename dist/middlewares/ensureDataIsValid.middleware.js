"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDataIsValidMiddleware = void 0;
const ensureDataIsValidMiddleware = (schema) => (request, response, next) => {
    const validatedData = schema.parse(request.body);
    request.body = validatedData;
    return next();
};
exports.ensureDataIsValidMiddleware = ensureDataIsValidMiddleware;

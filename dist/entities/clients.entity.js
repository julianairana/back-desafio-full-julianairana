"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.GenderClient = void 0;
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
const bcryptjs_1 = require("bcryptjs");
var GenderClient;
(function (GenderClient) {
    GenderClient["DEFAULT"] = "Prefer not to say";
    GenderClient["MALE"] = "male";
    GenderClient["FEMALE"] = "female";
    GenderClient["NOBINARY"] = "no binary";
})(GenderClient = exports.GenderClient || (exports.GenderClient = {}));
let Client = class Client {
    hashPassword() {
        const isEncrypted = (0, bcryptjs_1.getRounds)(this.password);
        if (!isEncrypted) {
            this.password = (0, bcryptjs_1.hashSync)(this.password, 10);
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45, unique: true }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], Client.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Client.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Client.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: GenderClient, default: GenderClient.DEFAULT }),
    __metadata("design:type", String)
], Client.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Client.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => contact_entity_1.Contact, (contact) => contact.client),
    __metadata("design:type", Array)
], Client.prototype, "contact", void 0);
Client = __decorate([
    (0, typeorm_1.Entity)("client")
], Client);
exports.Client = Client;

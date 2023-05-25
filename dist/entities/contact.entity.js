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
exports.Contact = exports.GenderContact = void 0;
const clients_entity_1 = require("./clients.entity");
const typeorm_1 = require("typeorm");
var GenderContact;
(function (GenderContact) {
    GenderContact["DEFAULT"] = "not informed";
    GenderContact["MALE"] = "male";
    GenderContact["FEMALE"] = "female";
    GenderContact["NOBINARY"] = "no binary";
})(GenderContact = exports.GenderContact || (exports.GenderContact = {}));
let Contact = class Contact {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Contact.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Contact.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45, nullable: true }),
    __metadata("design:type", Object)
], Contact.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Contact.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Contact.prototype, "dateRegister", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: GenderContact, default: GenderContact.DEFAULT }),
    __metadata("design:type", String)
], Contact.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clients_entity_1.Client, (client) => client.contact),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", clients_entity_1.Client)
], Contact.prototype, "client", void 0);
Contact = __decorate([
    (0, typeorm_1.Entity)("contact")
], Contact);
exports.Contact = Contact;

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
exports.CreateClient1685030340219 = void 0;
class CreateClient1685030340219 {
    constructor() {
        this.name = 'CreateClient1685030340219';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."contact_gender_enum" AS ENUM('not informed', 'male', 'female', 'no binary')`);
            yield queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullName" character varying(45) NOT NULL, "email" character varying(45), "phone" character varying(45) NOT NULL, "dateRegister" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."contact_gender_enum" NOT NULL DEFAULT 'not informed', "clientId" integer, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."client_gender_enum" AS ENUM('Prefer not to say', 'male', 'female', 'no binary')`);
            yield queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(45) NOT NULL, "image" text, "dateRegister" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."client_gender_enum" NOT NULL DEFAULT 'Prefer not to say', CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526"`);
            yield queryRunner.query(`DROP TABLE "client"`);
            yield queryRunner.query(`DROP TYPE "public"."client_gender_enum"`);
            yield queryRunner.query(`DROP TABLE "contact"`);
            yield queryRunner.query(`DROP TYPE "public"."contact_gender_enum"`);
        });
    }
}
exports.CreateClient1685030340219 = CreateClient1685030340219;

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClient1685030340219 implements MigrationInterface {
    name = 'CreateClient1685030340219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contact_gender_enum" AS ENUM('not informed', 'male', 'female', 'no binary')`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "fullName" character varying(45) NOT NULL, "email" character varying(45), "phone" character varying(45) NOT NULL, "dateRegister" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."contact_gender_enum" NOT NULL DEFAULT 'not informed', "clientId" integer, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."client_gender_enum" AS ENUM('Prefer not to say', 'male', 'female', 'no binary')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(45) NOT NULL, "image" text, "dateRegister" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."client_gender_enum" NOT NULL DEFAULT 'Prefer not to say', CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "public"."client_gender_enum"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TYPE "public"."contact_gender_enum"`);
    }

}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Contact } from "./contact.entity";
import { getRounds, hashSync } from "bcryptjs";

export enum GenderClient {
    DEFAULT = "Prefer not to say",
    MALE = "male",
    FEMALE = "female",
    NOBINARY = "no binary",
}

@Entity("client")
export class Client {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type:"varchar", length: 45})
  fullName: string;

  @Column({type:"varchar", length: 45, unique: true})
  email: string;

  @Column({type:"varchar", length: 120})
  password: string

  @Column({type:"varchar", length: 45, unique: true})
  phone: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateRegister: Date;

  @Column({ type: "enum", enum: GenderClient, default: GenderClient.DEFAULT })
  gender: GenderClient;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
      const isEncrypted = getRounds(this.password)
      if (!isEncrypted) {
          this.password = hashSync(this.password, 10)
      }
}

  @OneToMany(() => Contact, (contact) => contact.client)
  contact: Contact[];
}
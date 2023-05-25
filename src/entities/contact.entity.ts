import { Client } from "./clients.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

export enum GenderContact {
    DEFAULT = "not informed",
    MALE = "male",
    FEMALE = "female",
    NOBINARY = "no binary",
}

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type:"varchar", length: 45})
  fullName: string;

  @Column({type:"varchar", length: 45, nullable: true})
  email?: string | undefined | null

  @Column({type:"varchar", length: 45})
  phone: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateRegister: Date;

  @Column({ type: "enum", enum: GenderContact, default: GenderContact.DEFAULT })
  gender: GenderContact;

  @ManyToOne(() => Client, (client) => client.contact)
  @JoinColumn()
  client: Client;
}
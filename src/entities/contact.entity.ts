import { Client } from "./clients.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

enum GenderContact {
    DEFAULT = "Prefer not to say",
    MALE = "male",
    FEMALE = "female",
    NOBINARY = "no binary",
}

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:"varchar", length: 45})
  fullName: string;

  @Column({type:"varchar", length: 45, unique: true})
  email: string;

  @Column({type:"varchar", length: 45, unique: true})
  phone: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateRegister: Date;

  @Column({ type: "enum", enum: GenderContact, default: GenderContact.DEFAULT })
  gender: GenderContact;

  @ManyToOne(() => Client, (client) => client.contact)
  @JoinColumn()
  client: Client;
}
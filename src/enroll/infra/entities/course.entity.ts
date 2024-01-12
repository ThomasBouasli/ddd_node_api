import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => User, (user) => user.courses)
  members: User[];
}

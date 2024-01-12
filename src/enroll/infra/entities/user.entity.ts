import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Course, (course) => course.members)
  courses: Course[];
}

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Course, (course) => course.members)
  courses: Course[];
}

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./course.entity";

enum UserRegistrationStep {
  BasicInformation,
  Done
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ enum: UserRegistrationStep })
  registration_step: UserRegistrationStep

  @ManyToMany(() => Course, (course) => course.members)
  courses: Course[];
}

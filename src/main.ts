import "reflect-metadata";

import { DataSource, EntityManager } from "typeorm";

import { Course } from "@/infra/entities/course.entity";
import { User } from "@/infra/entities/user.entity";

import { CreateUserUC } from "./application/create-user/use-case";
import { faker } from "@faker-js/faker";

async function main() {
  const connection = new DataSource({
    type: "sqlite",
    database: "test",
    entities: [User, Course],
    synchronize: true,
  });

  await connection.initialize();

  const manager = new EntityManager(connection);

  const createUserUC = new CreateUserUC(manager);

  await createUserUC.execute({ name: faker.person.fullName(), password: faker.internet.password() });

  const res = await manager.find(User);

  console.log(res);
}

main();

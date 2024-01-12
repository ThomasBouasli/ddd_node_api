import { DataSource, EntityManager } from "typeorm";

import { Course } from "@/enroll/infra/entities/course.entity";
import { User } from "@/enroll/infra/entities/user.entity";

import "@/enroll/presenters/broker"

async function main() {
  const connection = new DataSource({
    type: "sqlite",
    database: "db/enroll",
    entities: [User, Course],
    synchronize: true,
    dropSchema: true
  });

  await connection.initialize();

  const manager = new EntityManager(connection);

  const res = await manager.find(User);

  console.log(res);
}

main();

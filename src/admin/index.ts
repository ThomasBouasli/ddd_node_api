import { DataSource, EntityManager } from "typeorm";

import { Course } from "@/admin/infra/entities/course.entity";
import { User } from "@/admin/infra/entities/user.entity";

import { CreateUserUC } from "./application/create-user/use-case";
import { faker } from "@faker-js/faker";
import { RoutedPayload, SQSMessageBroker } from "@lideranca-sites/message-broker";

async function main() {
  const connection = new DataSource({
    type: "sqlite",
    database: "db/admin",
    entities: [User, Course],
    synchronize: true,
    dropSchema: true
  });

  const broker = new SQSMessageBroker<RoutedPayload>({
    queue: "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/ddd_node_api",
    region: "us-east-1",
    credentials: {
      accessKeyId: "teste",
      secretAccessKey: "teste",
    }
  })

  await connection.initialize();

  const manager = new EntityManager(connection);

  const createUserUC = new CreateUserUC(manager, broker);

  await createUserUC.execute({ name: faker.person.fullName(), password: faker.internet.password() });

  const res = await manager.find(User);

  console.log(res);
}

main();

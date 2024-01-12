import { faker } from "@faker-js/faker";
import { DataSource, EntityManager } from "typeorm";
import { describe, expect, it } from "vitest";

import { Course } from "@/infra/entities/course.entity";
import { User } from "@/infra/entities/user.entity";

import { CreateCourseUC } from "./use-case";

describe("CreateCourseUC", async () => {
  const connection = new DataSource({
    type: "sqlite",
    database: "test",
    entities: [User, Course],
    synchronize: true,
  });

  await connection.initialize();

  const manager = new EntityManager(connection);

  const sut = new CreateCourseUC(manager);

  it("should create an course", async () => {
    expect(sut.execute({ name: faker.company.name() })).resolves.not.toThrow();
  });

  it("should return an application error", () => {
    expect(sut.execute({ name: "" })).resolves.toThrow();
  });
});

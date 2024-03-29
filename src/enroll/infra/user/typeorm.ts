import { EntityManager } from "typeorm";

import { Course as DomainCourse } from "@/enroll/domain/course";
import { User as DomainUser } from "@/enroll/domain/user";
import { User as TypeORMUser } from "@/enroll/infra/entities/user.entity";

import {
  PersistenceUser,
  UserMapper,
  UserRepository,
  UserRepositoryFactory,
} from "./interface";

class TypeORMUserMapper implements UserMapper {
  toDomain({ id, courses, registration_step }: PersistenceUser): DomainUser {
    const mapped_courses = courses.map((course) =>
      DomainCourse.existing({}, course.id),
    );

    return DomainUser.existing({ courses: mapped_courses, registration_step }, id);
  }

  toPersistence(aggregateRoot: DomainUser): PersistenceUser {
    const courses = aggregateRoot
      .getCourses()
      .getItems()
      .map((course) => ({ id: course.id.value }));

    return {
      id: aggregateRoot.id.value,
      registration_step: aggregateRoot.getRegistrationStep(),
      courses,
    };
  }
}

class TypeORMUserRepository implements UserRepository {
  constructor(
    private readonly manager: EntityManager,
    private readonly mapper: UserMapper,
  ) { }

  async save(aggregateRoot: DomainUser) {
    const persistence = this.mapper.toPersistence(aggregateRoot);
    const entity = this.manager.create(TypeORMUser, persistence);
    await this.manager.save(entity);
  }

  async getById(id: string) {
    const entity = await this.manager.findOneBy(TypeORMUser, { id });
    if (!entity) return undefined;
    return this.mapper.toDomain(entity);
  }
}

export class TypeORMUserRepositoryFactory implements UserRepositoryFactory {
  constructor(private readonly manager: EntityManager) { }

  create(): UserRepository {
    const mapper = new TypeORMUserMapper();
    return new TypeORMUserRepository(this.manager, mapper);
  }
}

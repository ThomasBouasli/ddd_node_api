import { ApplicationError } from "domain-utilities";
import { EntityManager } from "typeorm";

import { Course as TypeORMCourse } from "@/infra/entities/course.entity";

import {
  CreateCourseRequest,
  CreateCourseResponse,
  ICreateCourseUC,
  request_schema,
} from "./interface";

/*
 * This class bypasses the domain because it does nothing with the business logic
 * it only persists the name of a course, which is irrelevant to the business invariants
 */
export class CreateCourseUC implements ICreateCourseUC {
  constructor(private readonly manager: EntityManager) {}

  async execute(request: CreateCourseRequest): CreateCourseResponse {
    try {
      const validated = request_schema.parse(request);
      const course = this.manager.create(TypeORMCourse, validated);
      await this.manager.save(course);
    } catch (e) {
      throw new ApplicationError(`Invalid request: ${e}`);
    }
  }
}

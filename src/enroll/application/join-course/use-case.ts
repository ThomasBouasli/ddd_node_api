import { ApplicationError, left, right } from "domain-utilities";

import { Course } from "@/enroll/domain/course";
import { UserRepository } from "@/enroll/infra/user";

import {
  IJoinCourseUC,
  JoinCourseRequest,
  JoinCourseResponse,
  request_schema,
} from "./interface";

/*
 * This class bypasses the domain because it does nothing with the business logic
 * it only persists the user name and password, which are not business concepts
 */
export class JoinCourseUC implements IJoinCourseUC {
  constructor(private readonly repo: UserRepository) { }

  async execute(request: JoinCourseRequest): JoinCourseResponse {
    try {
      const validated = request_schema.parse(request);
      const user = await this.repo.getById(validated.userId);

      if (!user) {
        return left(new ApplicationError("User does not exist!"));
      }

      // Realistically, what would actually happen is that
      // course would not be a part of user, it would only store an id
      // because in the joining bounded context, course is not the same as
      // in the administrative BC (bounded context), but this would involve
      // async messaging and other infrastructural complexities which i tend to avoid
      const course = Course.existing({}, validated.courseId);

      const voidOrError = user.addCourse(course);

      if (voidOrError.isLeft()) {
        throw new ApplicationError(
          `Could not join the course: ${voidOrError.value}`,
        );
      }

      await this.repo.save(user);

      return right(undefined);
    } catch (e) {
      throw new ApplicationError(`Invalid request: ${e}`);
    }
  }
}

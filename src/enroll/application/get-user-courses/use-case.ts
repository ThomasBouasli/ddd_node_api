import { ApplicationError, left, right } from "domain-utilities";


import {
  IGetUserCoursesUC,
  GetUserCoursesRequest,
  GetUserCoursesResponse,
  request_schema,
} from "./interface";
import { EntityManager } from "typeorm";
import { User } from "@/enroll/infra/entities/user.entity";


export class GetUserCoursesUC implements IGetUserCoursesUC {
  constructor(private readonly manager: EntityManager) { }

  async execute(request: GetUserCoursesRequest): GetUserCoursesResponse {
    try {
      const validated = request_schema.parse(request);
      const user = await this.manager.findOne(User, { where: { id: request.userId }, relations: { courses: true } },)

      if (!user) {
        return left(new ApplicationError("User does not exist!"));
      }

      return right(user.courses.map(course => ({ id: course.id })));
    } catch (e) {
      throw new ApplicationError(`Invalid request: ${e}`);
    }
  }
}

import { ApplicationError, Either, IUseCase } from "domain-utilities";
import { z } from "zod";

export const request_schema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
});

export type JoinCourseRequest = z.infer<typeof request_schema>;

export type JoinCourseResponse = Promise<Either<ApplicationError, void>>;

export interface IJoinCourseUC
  extends IUseCase<JoinCourseRequest, JoinCourseResponse> {}

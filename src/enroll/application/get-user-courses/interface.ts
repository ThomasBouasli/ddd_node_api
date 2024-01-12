import { ApplicationError, Either, IUseCase } from "domain-utilities";
import { z } from "zod";

export const request_schema = z.object({
  userId: z.string().uuid(),
});

export type GetUserCoursesRequest = z.infer<typeof request_schema>;

export type UserCoursesDTO = {
  id: string,
}

export type GetUserCoursesResponse = Promise<Either<ApplicationError, UserCoursesDTO[]>>;

export interface IGetUserCoursesUC
  extends IUseCase<GetUserCoursesRequest, GetUserCoursesResponse> { }

import { IUseCase } from "domain-utilities";
import { z } from "zod";

export const request_schema = z.object({
  name: z.string().min(3).max(100),
});

export type CreateCourseRequest = z.infer<typeof request_schema>;

export type CreateCourseResponse = Promise<void>;

export interface ICreateCourseUC
  extends IUseCase<CreateCourseRequest, CreateCourseResponse> {}

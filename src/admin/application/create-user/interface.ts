import { IUseCase } from "domain-utilities";
import { z } from "zod";

export const request_schema = z.object({
  name: z.string().min(3).max(100),
  password: z.string().min(8),
});

export type CreateUserRequest = z.infer<typeof request_schema>;

export type CreateUserResponse = Promise<void>;

export interface ICreateUserUC
  extends IUseCase<CreateUserRequest, CreateUserResponse> {}

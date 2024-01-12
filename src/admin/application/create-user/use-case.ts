import { ApplicationError } from "domain-utilities";
import { EntityManager } from "typeorm";

import { User as TypeORMUser } from "@/admin/infra/entities/user.entity";

import {
  CreateUserRequest,
  CreateUserResponse,
  ICreateUserUC,
  request_schema,
} from "./interface";
import { MessageBroker, RoutedPayload } from "@lideranca-sites/message-broker";

/*
 * This class bypasses the domain because it does nothing with the business logic
 * it only persists the user name and password, which are not business concepts
 */
export class CreateUserUC implements ICreateUserUC {
  constructor(private readonly manager: EntityManager, private readonly broker: MessageBroker<RoutedPayload<{ id: string }>>) { }

  async execute(request: CreateUserRequest): CreateUserResponse {
    try {
      const validated = request_schema.parse(request);
      const user = this.manager.create(TypeORMUser, validated);
      await this.manager.save(user);
      await this.broker.publish({
        id: crypto.randomUUID(),
        command: "user",
        action: "created",
        params: {
          id: user.id
        }
      })
    } catch (e) {
      throw new ApplicationError(`Invalid request: ${e}`);
    }
  }
}

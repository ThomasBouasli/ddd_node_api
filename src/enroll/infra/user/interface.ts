import { iMapper, iRepository } from "domain-utilities";

import { User as DomainUser } from "@/enroll/domain/user";

enum UserRegistrationStep {
  BasicInformation,
  Done
}

export type PersistenceCourse = {
  id: string;
};

export type PersistenceUser = {
  id: string;
  courses: PersistenceCourse[];
  registration_step: UserRegistrationStep
};

export interface UserMapper extends iMapper<PersistenceUser, DomainUser> { }

export interface UserRepository extends iRepository<DomainUser> { }

export interface UserRepositoryFactory {
  create(): UserRepository;
}

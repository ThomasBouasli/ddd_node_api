import { iMapper, iRepository } from "domain-utilities";

import { User as DomainUser } from "@/domain/user";

export type PersistenceCourse = {
  id: string;
};

export type PersistenceUser = {
  id: string;
  courses: PersistenceCourse[];
};

export interface UserMapper extends iMapper<PersistenceUser, DomainUser> {}

export interface UserRepository extends iRepository<DomainUser> {}

export interface UserRepositoryFactory {
  create(): UserRepository;
}

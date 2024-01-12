import { UserRepository } from "@/enroll/infra/user"
import { register as registerUserCreated } from "./user-created"
import { register as registerOnboardingCompleted } from "./user-onboarding-completed"

export function register(repo: UserRepository) {
    registerUserCreated(repo)
    registerOnboardingCompleted(repo)
}
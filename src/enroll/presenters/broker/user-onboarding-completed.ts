import { routedSubscription } from "@lideranca-sites/message-broker"
import { observable } from "./connection"
import { User, UserRegistrationStep } from "@/enroll/domain/user"
import { UserRepository } from "@/enroll/infra/user"

export async function register(repo: UserRepository) {
    routedSubscription<{ id: string }>(observable, "user-onboarding:completed", async (message) => {
        console.log(`User with ID: ${message.data.params.id} Onboarding Completed`)

        const user = User.existing({ registration_step: UserRegistrationStep.Done }, message.data.params.id);

        await repo.save(user);

        await message.acknowledge()

        const found = await repo.getById(user.id.value)

        console.log(`user-onboarding:completed found ${found}`)
    })
}
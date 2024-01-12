import { routedSubscription } from "@lideranca-sites/message-broker"
import { observable } from "./connection"
import { User } from "@/enroll/domain/user"
import { UserRepository } from "@/enroll/infra/user"

export async function register(repo: UserRepository) {
    routedSubscription<{ id: string }>(observable, "user:created", async (message) => {
        console.log(`User created with ID: ${message.data.params.id}`)

        const user = User.existing({}, message.data.params.id);

        await repo.save(user);

        await message.acknowledge()

        const found = await repo.getById(user.id.value)

        console.log(`user:created found ${found}`)
    })
}
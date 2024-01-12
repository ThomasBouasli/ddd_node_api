import { routedSubscription } from "@lideranca-sites/message-broker"
import { observable } from "./connection"

routedSubscription<{ id: string }>(observable, "user:created", async (message) => {
    // This is where logic to add the user to this microservice database would go
    console.log(`User created with ID: ${message.data.params.id}`)
    await message.acknowledge()
})
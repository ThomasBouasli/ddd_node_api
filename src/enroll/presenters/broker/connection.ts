import { RoutedPayload, SQSMessageBroker, routedSubscription } from "@lideranca-sites/message-broker";

const queue = new SQSMessageBroker<RoutedPayload>({
    queue: "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/ddd_node_api",
    region: "us-east-1",
    credentials: {
        accessKeyId: "teste",
        secretAccessKey: "teste",
    }
})

export const observable = queue.poll(100)

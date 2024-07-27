import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AMQConsumerController } from "./amq.consumer.controller";
import { WebSocketModule } from "src/websocket/websocket.module";

@Module({
    imports: [
        WebSocketModule,
        ClientsModule.register([
            {
                name: "RABBIT_MQ_SESSION_QUEUE_CONSUMER",
                transport: Transport.RMQ,
                options: {
                    queue: process.env.RMQ_SESSION_STATE_QUEUE,
                    urls: [process.env.RMQ_URL_CONN],
                    prefetchCount: 1,
                    queueOptions: {
                        durable: true
                    },

                }
            }
        ])
    ],
    controllers: [AMQConsumerController]
})
export class AMQConsumerModule {}
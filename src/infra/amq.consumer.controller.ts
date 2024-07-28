import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { MessageSessionInterface } from "src/interfaces/messageSession.interface";
import { ChatGateway } from "src/websocket/chat.websocket";


@Controller()
export class AMQConsumerController {

    constructor(
        private readonly chatGateway: ChatGateway
    ) {}

    @EventPattern('update.session')
    async handleMessages(@Payload() data: MessageSessionInterface) {
        this.chatGateway.sendMenssageToClients(data)
    }
}
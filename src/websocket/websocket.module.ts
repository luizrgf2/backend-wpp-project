import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.websocket";

@Module({
    providers: [ChatGateway],
    exports: [ChatGateway]
})
export class WebSocketModule {}
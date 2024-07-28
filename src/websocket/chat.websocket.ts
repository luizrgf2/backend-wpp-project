import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageSessionInterface } from 'src/interfaces/messageSession.interface';

@WebSocketGateway({
  cors: {
    origin: "*"
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clients.delete(client.id);
    Logger.log(`Client disconnected ${client.id}`)
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.clients.set(client.id, client);
    Logger.log(`Client connected ${client.id}`)
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): void {
    this.server.emit('message', message);
  }

  sendMenssageToClients(msg: MessageSessionInterface) {
    Logger.log(msg)
    this.server.emit('session.update',msg)
  }

}

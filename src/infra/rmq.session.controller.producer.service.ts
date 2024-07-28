import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqp, { ChannelWrapper } from "amqp-connection-manager";
import {Channel} from 'amqplib'
import { TextMenssageInterface } from "src/interfaces/menssage.interface";
import { SessionControllerInterface } from "src/interfaces/sessionController.interface";

@Module({})
export class RMQSessionControllerProducer implements OnModuleInit {
    private channelWrapper: ChannelWrapper
    private messageQueueName: string

    
    async onModuleInit() {
        this.messageQueueName = process.env.RMQ_SESSION_CONTROLLER_QUEUE
        const connection = amqp.connect([process.env.RMQ_URL_CONN]);
        this.channelWrapper = connection.createChannel({
          setup: async (channel: Channel) => {
            return await channel.assertQueue(this.messageQueueName, { durable: true });
          },
        });
    }

    async sendTextMenssageToQueue(message: SessionControllerInterface) {
      const messageBuffer = Buffer.from(JSON.stringify(message))
      const sendOrError = await this.channelWrapper.sendToQueue(this.messageQueueName, messageBuffer, {
        persistent: true,
        expiration: 10000
      })

      if(!sendOrError) {
        Logger.error('Erro para enviar mensagem para a fila de mensagens!')
      }
    }
}
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { RMQProducer } from 'src/infra/rmq.producer.service';

@Module({
  providers: [
    MessagesService,
    RMQProducer
  ],
  controllers: [MessagesController]
})
export class MessagesModule {}

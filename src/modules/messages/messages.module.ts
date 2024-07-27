import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { RMQProducer } from 'src/infra/rmq.producer.service';
import { PrismaService } from 'src/infra/prisma.service';

@Module({
  providers: [
    PrismaService,
    MessagesService,
    RMQProducer
  ],
  controllers: [MessagesController]
})
export class MessagesModule {}

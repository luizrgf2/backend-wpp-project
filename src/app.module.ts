import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from './modules/config/config.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './modules/messages/messages.module';
import { AMQConsumerModule } from './infra/amq.consumer.module';
import { ContactsModule } from './modules/contacts/contacts.module';

@Module({
  imports: [
    AMQConsumerModule,
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MessagesModule,
    ContactsModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from './modules/config/config.module';
import { ConfigModule } from '@nestjs/config';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MessagesModule,
  ],
})
export class AppModule {}

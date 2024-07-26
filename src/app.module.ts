import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from './modules/config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class AppModule {}

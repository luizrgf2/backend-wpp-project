import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as ConfigurationModule } from './modules/config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

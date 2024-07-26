import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { RedisService } from 'src/infra/redis.service';

@Module({
  controllers: [ConfigController],
  providers: [ConfigService, RedisService]
})
export class ConfigModule {}

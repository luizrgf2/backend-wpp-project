import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { RMQSessionControllerProducer } from 'src/infra/rmq.session.controller.producer.service';

@Module({
  providers: [SessionService, RMQSessionControllerProducer],
  controllers: [SessionController]
})
export class SessionModule {}

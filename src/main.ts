import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
        queue: process.env.RMQ_SESSION_STATE_QUEUE,
        urls: [process.env.RMQ_URL_CONN],
        prefetchCount: 1,
        queueOptions: {
            durable: true
        },

    }
  });
  await app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();

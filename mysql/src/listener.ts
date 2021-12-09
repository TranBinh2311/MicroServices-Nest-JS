import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://lwnltshb:riZ1nH_3Qo6P9pYB7tpSlo1pziE4LfRz@cow.rmq2.cloudamqp.com/lwnltshb',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen().then(() => {
    console.log('Microservices is listening...');
  });
}
bootstrap();

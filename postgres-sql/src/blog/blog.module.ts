import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BLOG_SERVICE',
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
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
})
export class BlogModule {}

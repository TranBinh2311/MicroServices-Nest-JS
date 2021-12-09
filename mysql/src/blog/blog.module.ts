import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [BlogController],
  providers: [BlogService, PrismaService, HttpService],
  exports: [BlogService, HttpService],
})
export class BlogModule {}

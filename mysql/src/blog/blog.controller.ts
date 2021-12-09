import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { title } from 'process';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @EventPattern('createBlog')
  async createBlog(data: CreateBlogDto) {
    const { title, description, likes, image } = { ...data };
    return await this.blogService.create({ title, description, likes, image });
  }

  @EventPattern('updateBlog')
  async updateBlog(data: any) {
    return await this.blogService.update(data.id, {
      title: data.title,
      description: data.description,
      likes: data.likes,
      image: data.image,
    });
  }

  @EventPattern('removeBlog')
  async deleteBlog(data: any) {
    return await this.blogService.remove(data.id);
  }

  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @Post(':id/like')
  async like(@Param('id') id: number) {
    return await this.blogService.like(id);
  }
}

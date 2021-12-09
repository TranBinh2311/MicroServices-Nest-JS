import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';
import { timeStamp } from 'console';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BlogService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('BLOG_SERVICE') private readonly client: ClientProxy,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    let res = await this.prismaService.blog.create({ data: createBlogDto });
    this.client.emit('createBlog', res);
    return res;
  }

  async findAll() {
    return await this.prismaService.blog.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.blog.findUnique({ where: { id } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    let res = await this.prismaService.blog.update({
      where: { id },
      data: updateBlogDto,
    });
    this.client.emit('updateBlog', res);
    return res;
  }

  async remove(id: number) {
    let res = await this.prismaService.blog.delete({
      where: { id },
    });
    this.client.emit('deleteBlog', res);
    return res;
  }

  async like(id: string) {
    let res = await this.prismaService.blog.findUnique({
      where: { id: parseInt(id) },
    });
    if (!res) throw new NotFoundException('Khong thay id nay');

    return await this.prismaService.blog.update({
      where: { id: parseInt(id) },
      data: {
        ...res,
        likes: (parseInt(res.likes) + 1).toString(),
      },
    });
  }
}

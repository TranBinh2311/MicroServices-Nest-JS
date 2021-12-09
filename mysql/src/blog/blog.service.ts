import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    return await this.prismaService.blog.create({ data: createBlogDto });
  }

  async findAll() {
    return await this.prismaService.blog.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.blog.findUnique({ where: { id } });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.prismaService.blog.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.blog.delete({
      where: { id },
    });
  }

  async like(id: number) {
    let res = await this.prismaService.blog.findUnique({ where: { id } });
    if (!res) throw new NotFoundException('Khong thay id nay');
    // this.httpService
    //   .post('http://localhost:8000/blog/${id}/like', )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    return await this.prismaService.blog.update({
      where: { id },
      data: {
        ...res,
        likes: res.likes + 1,
      },
    });
  }
}

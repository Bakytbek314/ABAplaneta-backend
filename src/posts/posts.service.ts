import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async create(photo: any, description: string) {
    console.log(photo);

    const fileName = await this.fileService.createFile(photo);
    return this.prisma.post.create({
      data: {
        photo: fileName,
        description,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}

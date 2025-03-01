import { Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService, private fileService: FileService) {}

  async create(photo: any) {
    const fileName = await this.fileService.createFile(photo);
    return this.prisma.gallery.create({ data: { photo: fileName }});
  }

  async findAll() {
    return this.prisma.gallery.findMany();
  }

  async remove(id: number) {
    return this.prisma.gallery.delete({ where: { id }});
  }
}
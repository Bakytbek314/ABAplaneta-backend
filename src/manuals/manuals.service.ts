import { Injectable } from '@nestjs/common';
import { CreateManualDto } from './dto/create-manual.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class ManualsService {
  constructor(private prisma: PrismaService, private file: FileService) {}

  async create(documentName: string, manual: any) {
    const document = await this.file.createFile(manual);
    return this.prisma.manual.create({ data: { documentName, document }});
  }

  async findAll() {
    return this.prisma.manual.findMany();
  }

  async remove(id: number) {
    return this.prisma.manual.delete({ where: { id }});
  }
}

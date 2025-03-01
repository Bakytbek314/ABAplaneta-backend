import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class SpecialistCardService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createOrUpdate(
    specialistId: number,
    description: string,
    photo?: any,
    diplomaPhoto?: any,
  ) {
    const firstFileName = await this.fileService.createFile(photo);
    const secondFileName = await this.fileService.createFile(diplomaPhoto);
    return this.prisma.specialistCard.upsert({
      where: { specialistId },
      create: {
        specialistId,
        description,
        photo: firstFileName,
        diplomaPhoto: secondFileName,
      },
      update: {
        description,
        ...(firstFileName && { photo: firstFileName }),
        ...(secondFileName && { diplomaPhoto: secondFileName }),
      },
    });
  }

  async findAll() {
    return this.prisma.specialistCard.findMany({
      include: {
        specialist: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
  }

  async delete(id: number) {
    return this.prisma.specialistCard.delete({ where: { id } });
  }
}

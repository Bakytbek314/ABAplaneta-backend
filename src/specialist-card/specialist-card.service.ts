import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class SpecialistCardService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async create(
    specialistId: number,
    description: string,
    photo: any,
    diplomaPhoto: any,
  ) {
    const photoFileName = await this.fileService.createFile(photo);
    const diplomaFileName = await this.fileService.createFile(diplomaPhoto);

    return this.prisma.specialistCard.create({
      data: {
        specialistId,
        description,
        photo: photoFileName,
        diplomaPhoto: diplomaFileName,
      },
    });
  }

  async update(
    specialistId: number,
    description: string,
    photo?: any,
    diplomaPhoto?: any,
  ) {
    const updateData: any = { description };

    if(photo) {
      updateData.photo = this.fileService.createFile(photo)
    }

    if(diplomaPhoto) {
      updateData.diplomaPhoto = this.fileService.createFile(diplomaPhoto)
    }

    return this.prisma.specialistCard.update({
      where: { specialistId },
      data: updateData
    })
  }

  async findAll() {
    return this.prisma.specialistCard.findMany({
      include: {
        specialist: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.specialistCard.delete({ where: { id } });
  }
}

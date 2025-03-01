import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupSessionDto } from '../dto/create-group-session.dto';

@Injectable()
export class GroupSessionsService {
  constructor(private prisma: PrismaService) {}

  async createGroupSession(dto: CreateGroupSessionDto) {
    const { mainSpecialistId, ...rest } = dto;

    return this.prisma.groupSession.create({
      data: {
        ...rest,
        mainSpecialistId,
        day: 'Понедельник-Пятница',
      },
    });
  }

  async addPatientToGroupSession(sessionId: number, patientId: number) {
    return this.prisma.groupSession.update({
      where: { id: sessionId },
      data: {
        patients: { connect: { id: patientId } },
      },
    });
  }

  async addSpecialistToGroupSession(sessionId: number, specialistId: number) {
    const session = await this.prisma.groupSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw new NotFoundException('Group session not found');
    }

    return this.prisma.groupSession.update({
      where: { id: sessionId },
      data: {
        specialists: { connect: { id: specialistId } },
      },
    });
  }

  async findAllGroupSessions() {
    return this.prisma.groupSession.findMany({
      include: {
        patients: { select: { firstName: true, lastName: true } },
        specialists: { select: { firstName: true, lastName: true } },
      },
    });
  }

  async deleteGroupSessions(id: number) {
    return this.prisma.groupSession.delete({ where: { id } });
  }
}

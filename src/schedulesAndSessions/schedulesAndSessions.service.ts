import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateIndividualSessionsDto } from './dto/create-individual-sessions.dto';
import { UpdateSessionsDto } from './dto/update-sessions.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupSessionsDto } from './dto/create-group-sessions.dto';

@Injectable()
export class SchedulesAndSessionsService {
  constructor(private prisma: PrismaService) {}

  async createIndividualSession(createIndividualSession: CreateIndividualSessionsDto) {
    const { patientId, specialistId, startTime, endTime, day } = createIndividualSession;

    const hasConflict = await this.checkScheduleConflict(specialistId, startTime, endTime, day);
    if (hasConflict) {
      throw new BadRequestException('Specialist is already booked for this time slot.');
    }

    return this.prisma.individualSession.create({
      data: { patientId, specialistId, startTime, endTime, day }
    });
  }

  async findAllIndividualSessions() {
    return this.prisma.individualSession.findMany({
      include: {
        patient: { select: { firstName: true, lastName: true } },
        specialist: { select: { firstName: true, lastName: true } }
      }
    });
  }

  async createGroupSession(createGroupSession: CreateGroupSessionsDto) {
    const { patientIds, specialistIds, firstStageStartTime, firstStageEndTime, secondStageStartTime, secondStageEndTime, day, monthlyFee } = createGroupSession;

    for (const specialistId of specialistIds) {
      const hasConflict = await this.checkScheduleConflict(specialistId, firstStageStartTime, firstStageEndTime, day);
      if (hasConflict) {
        throw new BadRequestException(`Specialist with ID ${specialistId} is already booked during the first stage.`);
      }
    }

    return this.prisma.groupSession.create({
      data: {
        firstStageStartTime, firstStageEndTime, secondStageStartTime, secondStageEndTime, day, monthlyFee,
        patients: { connect: patientIds.map(id => ({ id })) },
        specialists: { connect: specialistIds.map(id => ({ id })) }
      }
    });
  }

  async findAllGroupSessions() {
    return this.prisma.groupSession.findMany({
      include: {
        patients: { select: { firstName: true, lastName: true } },
        specialists: { select: { firstName: true, lastName: true } }
      }
    });
  }

  async deleteGroupSessions(id: number) {
    return this.prisma.groupSession.delete({ where: { id } });
  }

  private async checkScheduleConflict(specialistId: number, startTime: string, endTime: string, day: string): Promise<boolean> {
    const individualConflicts = await this.prisma.individualSession.findFirst({
      where: {
        specialistId,
        day,
        OR: [
          { startTime: { lt: endTime }, endTime: { gt: startTime } }
        ]
      }
    });

    const groupConflicts = await this.prisma.groupSession.findFirst({
      where: {
        specialists: { some: { id: specialistId } },
        day,
        OR: [
          { firstStageStartTime: { lt: endTime }, firstStageEndTime: { gt: startTime } },
          { secondStageStartTime: { lt: endTime }, secondStageEndTime: { gt: startTime } }
        ]
      }
    });

    return !!(individualConflicts || groupConflicts);
  }
}
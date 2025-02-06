import { Injectable } from '@nestjs/common';
import { CreateIndividualSessionsDto } from './dto/create-individual-sessions.dto';
import { UpdateSessionsDto } from './dto/update-sessions.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupSessionsDto } from './dto/create-group-sessions.dto';

@Injectable()
export class SchedulesAndSessionsService {
  constructor(private prisma: PrismaService) {}
  async createIndividualSession(createIndividualSession: CreateIndividualSessionsDto) {
    const { patientId, specialistId, startTime, endTime, day } = createIndividualSession;

    return this.prisma.schedule.create({
      data: {
        patientId, specialistId, startTime, endTime, day
      }
    })
  }

  async findAllIndividualSessions() {
    return this.prisma.schedule.findMany({
      select: {
        day: true,
        startTime: true,
        endTime: true,
        patient: true,
        specialist: true
      }
    })
  }

  async createGroupSession(createGroupSession: CreateGroupSessionsDto) {
    const { patientIds, specialistIds, startTime, endTime, day, monthlyFee } = createGroupSession;

    return this.prisma.groupSession.create({
      data: {
        startTime, endTime, day, monthlyFee,
        patients: {
          connect: patientIds.map((id) => ({ id }))
        },
        specialists: {
          connect: specialistIds.map((id) => ({ id }))
        }
      }
    })
  }

  async findAllGroupSessions() {
    return this.prisma.groupSession.findMany({
      select: {
        day: true,
        startTime: true,
        endTime: true,
        patients: true,
        specialists: true
      }
    })
  }
}

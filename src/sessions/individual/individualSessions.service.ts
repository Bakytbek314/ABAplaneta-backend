import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIndividualSessionsDto } from '../dto/create-individual-sessions.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SchedulerService } from '../scheduler/scheduler.service';

@Injectable()
export class IndividualSessionsService {
  constructor(private prisma: PrismaService, private scheduler: SchedulerService) {}

  async createIndividualSession(dto: CreateIndividualSessionsDto) {
    const { patientId, specialistId, startTime, endTime, day } = dto;

    await this.scheduler.validateIndividualSession(dto);

    const specialist = await this.prisma.specialist.findUnique({
      where: { id: specialistId },
    });

    if (!specialist) {
      throw new NotFoundException('Specialist not found');
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.prisma.individualSession.create({
      data: { patientId, specialistId, startTime, endTime, day },
    });
  }

  async findAllIndividualSessions() {
    return this.prisma.individualSession.findMany({
      include: {
        patient: { select: { firstName: true, lastName: true } },
        specialist: { select: { firstName: true, lastName: true } },
      },
    });
  }

  async deleteIndividualSession(id: number) {
    return this.prisma.individualSession.delete({ where: { id } });
  }
}

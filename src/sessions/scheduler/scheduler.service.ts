import { Injectable, BadRequestException } from '@nestjs/common';
import { GroupSession } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupSessionDto } from '../dto/create-group-session.dto';
import { CreateIndividualSessionsDto } from '../dto/create-individual-sessions.dto';

@Injectable()
export class SchedulerService {
  constructor(private prisma: PrismaService) {}

  private async checkConflicts(
    entityType: 'specialist' | 'patient',
    entityId: number,
    days: string[],
    timeRanges: Array<{ start: string; end: string }>,
    excludeSessionId?: number,
  ) {
    const dayCondition = { in: days };

    const individualConflicts = await this.prisma.individualSession.findFirst({
      where: {
        [entityType === 'specialist' ? 'specialistId' : 'patientId']: entityId,
        day: dayCondition,
        OR: timeRanges.map((range) => ({
          AND: [
            { startTime: { lt: range.end } },
            { endTime: { gt: range.start } },
          ],
        })),
      },
    });

    const groupConflicts = await this.prisma.groupSession.findFirst({
      where: {
        day: dayCondition,
        OR: [
          {
            AND: [
              {
                mainSpecialistId:
                  entityType === 'specialist' ? entityId : undefined,
              },
              {
                OR: timeRanges.map((range) => ({
                  AND: [
                    { firstStageStartTime: { lt: range.end } },
                    { firstStageEndTime: { gt: range.start } },
                  ],
                })),
              },
            ],
          },
          {
            [entityType === 'specialist' ? 'specialists' : 'patients']: {
              some: { id: entityId },
            },
            OR: timeRanges.map((range) => ({
              AND: [
                { firstStageStartTime: { lt: range.end } },
                { firstStageEndTime: { gt: range.start } },
              ],
            })),
          },
        ],
      },
    });

    return !!individualConflicts || !!groupConflicts;
  }

  async validateGroupSession(dto: CreateGroupSessionDto) {
    const days =
      dto.day === 'Понедельник-Пятница'
        ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
        : [dto.day];

    const mainSpecialistBusy = await this.checkConflicts(
      'specialist',
      dto.mainSpecialistId,
      days,
      [
        { start: dto.firstStageStartTime, end: dto.firstStageEndTime },
        { start: dto.secondStageStartTime, end: dto.secondStageEndTime },
      ],
    );

    if (mainSpecialistBusy) {
      throw new BadRequestException('Main specialist has conflicts in stages');
    }

    const mainSpecialistFree = await this.checkConflicts(
      'specialist',
      dto.mainSpecialistId,
      days,
      [{ start: dto.firstStageEndTime, end: dto.secondStageStartTime }],
    );

    if (!mainSpecialistFree) {
      throw new BadRequestException(
        'Main specialist must be free between stages',
      );
    }
  }

  async validateSpecialistForGroup(
    specialistId: number,
    session: GroupSession,
  ) {
    const days =
      session.day === 'Понедельник-Пятница'
        ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница']
        : [session.day];

    const stagesConflict = await this.checkConflicts(
      'specialist',
      specialistId,
      days,
      [
        { start: session.firstStageStartTime, end: session.firstStageEndTime },
        {
          start: session.secondStageStartTime,
          end: session.secondStageEndTime,
        },
      ],
    );

    if (stagesConflict) {
      throw new BadRequestException('Specialist has conflicts in stages');
    }

    const betweenStagesFree = await this.checkConflicts(
      'specialist',
      specialistId,
      days,
      [{ start: session.firstStageEndTime, end: session.secondStageStartTime }],
    );

    if (betweenStagesFree) {
      throw new BadRequestException(
        '',
      );
    }
  }

  async validateIndividualSession(dto: CreateIndividualSessionsDto) {
    const conflicts = await this.checkConflicts(
      'specialist',
      dto.specialistId,
      [dto.day],
      [{ start: dto.startTime, end: dto.endTime }],
    );

    if (conflicts) {
      throw new BadRequestException('У специалиста конфликт');
    }

    const patientConflicts = await this.checkConflicts(
      'patient',
      dto.patientId,
      [dto.day],
      [{ start: dto.startTime, end: dto.endTime }],
    );

    if (patientConflicts) {
      throw new BadRequestException('У пациента конфликт.');
    }
  }
}
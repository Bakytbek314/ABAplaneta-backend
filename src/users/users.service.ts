import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, Specialist, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getPatients(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        user: {
          select: {
            login: true,
            createdAt: true,
          },
        },
        individualSession: {
          include: {
            specialist: {
              select: {
                specialization: true,
              },
            },
          },
        },
        groupSessions: true,
        developmentResults: {
          include: {
            specialist: {
              select: {
                specialization: true,
              },
            },
          },
        },
        payments: true,
        debts: true,
      },
    });
  }

  async getPatient(id: number): Promise<Patient> {
    return this.prisma.patient.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            login: true,
            createdAt: true,
          },
        },
        individualSession: {
          include: {
            specialist: {
              select: {
                specialization: true,
              },
            },
          },
        },
        groupSessions: true,
        developmentResults: {
          include: {
            specialist: {
              select: {
                specialization: true,
              },
            },
          },
        },
        payments: true,
        debts: true,
      },
    });
  }

  async getSpecialists(): Promise<Specialist[]> {
    return this.prisma.specialist.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        user: {
          select: {
            login: true,
            createdAt: true,
          },
        },
        individualSession: {
          include: {
            patient: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        groupSessions: true,
      },
    });
  }

  async getSpecialist(id: number): Promise<Specialist> {
    return this.prisma.specialist.findUnique({
      where: { id },
      include: {
        individualSession: {
          include: {
            patient: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        groupSessions: true,
        mainGroupSessions: true,
      },
    });
  }
}

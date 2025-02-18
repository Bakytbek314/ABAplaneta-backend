import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Patient, Specialist, User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor( private prisma: PrismaService ) {}

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getPatients(): Promise<Patient[]> {
    return this.prisma.patient.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        user: {
          select: {
            login: true,
            createdAt: true
          }
        },
        individualSession: true,
        groupSessions: true,
        developmentResults: true,
        payments: true,
        debts: true
      }
    });
  }

  async getSpecialists(): Promise<Specialist[]> {
    return this.prisma.specialist.findMany({
      orderBy: {
        id: 'desc'
      },
      include: {
        user: {
          select: {
            login: true,
            createdAt: true
          }
        },
        individualSession: true,
        groupSessions: true
      }
    });
  }
}
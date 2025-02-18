import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { login, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user) {
      throw new UnauthorizedException("Invalid login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id })
    }

  }

  async register(registerDto: RegisterDto): Promise<User> {
    const {
      role,
      login,
      firstName,
      lastName,
      parentLastName,
      parentFirstName,
      password,
      specialization,
      salaryPercent,
      phoneNumber
    } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 5);

    const user = await this.prisma.user.create({
      data: {
        login: login,
        password: hashedPassword,
        role: role,
      },
    });

    if (role === 'PATIENT') {
      await this.prisma.patient.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          firstName: firstName,
          lastName: lastName,
          parentFirstName: parentFirstName,
          parentLastName: parentLastName,
          telephoneNumber: phoneNumber
        },
      });
    } else if (role === 'SPECIALIST') {
      await this.prisma.specialist.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          specialization: specialization,
          firstName: firstName,
          lastName: lastName,
          salaryPercent: Number(salaryPercent),
          telephoneNumber: phoneNumber
        },
      });
    }
    return user;
  }
}

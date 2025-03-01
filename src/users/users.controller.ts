import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { Patient, Specialist, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { Role } from 'src/auth/role/role.enum';

@Controller()
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get("users/:id")
  async getUser(@Param("id") id: number ): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Get("users")
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get("patients")
  async getPatients(): Promise<Patient[]> {
    return this.usersService.getPatients();
  }

  @Get("specialists")
  async getSpecialists(): Promise<Specialist[]>  {
    return this.usersService.getSpecialists();
  }

  @Get("specialists/:id")
  async getSpecialist(@Param("id") id: number): Promise<Specialist>  {
    return this.usersService.getSpecialist(Number(id));
  }

}

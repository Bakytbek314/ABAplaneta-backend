import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { Patient, Specialist, User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
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

  @UseGuards(JwtAuthGuard)
  @Get("specialists")
  async getSpecialists(): Promise<Specialist[]>  {
    return this.usersService.getSpecialists();
  }

}

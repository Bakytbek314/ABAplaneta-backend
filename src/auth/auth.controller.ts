import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { RegisterDto } from './dto/register.dto';
import { Patient, Specialist, User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { Role } from './role/role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './role/role.decorator';
import { RolesGuard } from './role/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(loginDto);
  }
}

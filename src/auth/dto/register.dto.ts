import { IsDateString } from "class-validator";

export class RegisterDto {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'SPECIALIST' | 'PATIENT';
  specialization?: string;
  salaryPercent?: number;
  parentFirstName?: string;
  parentLastName?: string;
  phoneNumber?: string;
}
export class RegisterDto {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  role: 'SPECIALIST' | 'PATIENT';
  specialization?: string;
  salaryPercent?: number;
  parentFirstName?: string;
  parentLastName?: string;
}
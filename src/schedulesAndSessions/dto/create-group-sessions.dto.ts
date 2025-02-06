export class CreateGroupSessionsDto {
  patientIds: number[];
  specialistIds: number[];
  startTime: string;
  endTime: string;
  day: string;
  monthlyFee: number;
}

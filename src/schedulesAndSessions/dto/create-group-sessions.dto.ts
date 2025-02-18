export class CreateGroupSessionsDto {
  patientIds: number[];
  specialistIds: number[];
  firstStageStartTime: string;
  firstStageEndTime: string;
  secondStageStartTime: string;
  secondStageEndTime: string;
  day: string;
  monthlyFee: number;
}

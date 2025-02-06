import { PartialType } from '@nestjs/mapped-types';
import { CreateIndividualSessionsDto } from './create-individual-sessions.dto';

export class UpdateSessionsDto extends PartialType(CreateIndividualSessionsDto) {}

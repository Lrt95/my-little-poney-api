import { PartialType } from '@nestjs/mapped-types';
import { CreateHorseDto } from './create-horse.dto';

export class UpdateHorseDto extends PartialType(CreateHorseDto) {
  owner?: string;
  dpUsers?: string[];
}

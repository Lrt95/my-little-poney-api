import { PartialType } from '@nestjs/mapped-types';
import { CreateContestDto } from './create-contest.dto';
import { AttendeeContest } from './contest.dto';

export class UpdateContestDto extends PartialType(CreateContestDto) {
  attendeesContest: AttendeeContest[];
}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePartyDto } from './create-party.dto';
import { AttendeeParty } from './party.dto';

export class UpdatePartyDto extends PartialType(CreatePartyDto) {
  attendeesParty: AttendeeParty[];
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { AttendeeParty } from './dto/party.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  create(@Body() createPartyDto: CreatePartyDto) {
    const create = createPartyDto;
    if (create['user']['userName']) {
      create['user'] = create['user']['_id'];
    }

    return this.partiesService.create(create);
  }

  @Get()
  findAll() {
    return this.partiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    const update = updatePartyDto;
    if (update['user']['userName']) {
      update['user'] = update['user']['_id'];
    }

    update['attendees'].forEach((attendeeParty: AttendeeParty, index) => {
      if (attendeeParty.user.userName) {
        update['attendees'][index]['user'] =
          update['attendees'][index]['user']['_id'];
      }
    });
    return this.partiesService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.delete(id);
  }
}

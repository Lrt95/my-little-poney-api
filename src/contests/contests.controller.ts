import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContestsService } from './contests.service';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { AttendeeContest } from './dto/contest.dto';

@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}

  @Post()
  create(@Body() createContestDto: CreateContestDto) {
    const create = createContestDto;
    if (create['user']['userName']) {
      create['user'] = create['user']['_id'];
    }
    return this.contestsService.create(create);
  }

  @Get()
  findAll() {
    return this.contestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contestsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
    const update = updateContestDto;
    if (update['user']['userName']) {
      update['user'] = update['user']['_id'];
    }

    update['attendees'].forEach((attendeeContest: AttendeeContest, index) => {
      if (attendeeContest.user.userName) {
        update['attendees'][index]['user'] =
          update['attendees'][index]['user']['_id'];
      }
    });

    return this.contestsService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contestsService.delete(id);
  }
}

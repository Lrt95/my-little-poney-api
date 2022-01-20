import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    const create = createLessonDto;
    if (create['user']['userName']) {
      create['user'] = create['user']['_id'];
    }

    return this.lessonsService.create(create);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    const update = updateLessonDto;
    if (update['user']['userName']) {
      update['user'] = update['user']['_id'];
    }

    update['attendees'].forEach((element: any, index) => {
      if (element['userName']) {
        update['attendees'][index] = update['attendees'][index]['_id'];
      }
    });

    return this.lessonsService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.delete(id);
  }
}

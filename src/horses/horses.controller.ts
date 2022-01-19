import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HorsesService } from './horses.service';
import { CreateHorseDto } from './dto/create-horse.dto';
import { UpdateHorseDto } from './dto/update-horse.dto';

@Controller('horses')
export class HorsesController {
  constructor(private readonly horsesService: HorsesService) {}

  @Post()
  create(@Body() createHorseDto: CreateHorseDto) {
    return this.horsesService.create(createHorseDto);
  }

  @Get()
  findAll() {
    return this.horsesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horsesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorseDto: UpdateHorseDto) {
    const update = updateHorseDto;
    if (update['owner']['userName']) {
      update['owner'] = update['owner']['_id'];
    }

    update['dpUsers'].forEach((element: any, index) => {
      if (element['userName']) {
        update['dpUsers'][index] = update['dpUsers'][index]['_id'];
      }
    });

    return this.horsesService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horsesService.delete(id);
  }
}

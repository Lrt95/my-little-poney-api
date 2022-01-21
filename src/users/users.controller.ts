import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto, UserForgetDto, UsersDto } from "./dto/user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('/ids')
  findByIds(@Body() usersDto: UsersDto) {
    return this.usersService.findOneByIds(usersDto.ids);
  }

  @Post('/forget')
  findByUserNameEmail(@Body() userForgetDto: UserForgetDto) {
    if (!userForgetDto.userName || !userForgetDto.email) {
      return { error: 'field missing' };
    }
    return this.usersService.findOneByUserNameAndMail(userForgetDto);
  }

  @Post('/login')
  findByPasswordEmail(@Body() userDto: UserDto) {
    if (!userDto.password || !userDto.email) {
      return { error: 'field missing' };
    }
    return this.usersService.findOneByPasswordAndMail(userDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const update = updateUserDto;

    update['horses'].forEach((element: any, index) => {
      if (element['name']) {
        update['horses'][index] = update['horses'][index]['_id'];
      }
    });

    return this.usersService.update(id, update);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}

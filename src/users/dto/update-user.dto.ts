import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Horse } from '../../horses/schema/horses.schema';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  profilePicture?: string;
  age?: number;
  FFELink?: string;
  phoneNumber?: string;
  role?: string;
  type?: string;
  horses?: string[];
}

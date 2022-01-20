import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { UserDto, UserForgetDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model
      .find()
      .populate('horses')
      .exec()
      .catch((error) => error);
  }

  async findOne(id: string): Promise<User> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('horses');
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }

  async findOneByUserNameAndMail(userForgetDto: UserForgetDto): Promise<User> {
    return await this.model
      .findOne({ userName: userForgetDto.userName, email: userForgetDto.email })
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('horses');
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }

  async findOneByPasswordAndMail(userDto: UserDto): Promise<User> {
    return await this.model
      .findOne({ password: userDto.password, email: userDto.email })
      .populate('horses')
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('horses');
        } else {
          throw { error: 'error login' };
        }
      })
      .catch((error) => error);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result.populate('horses'))
      .catch((error) => error);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('horses');
        } else {
          throw { error: 'user unknowns' };
        }
      })
      .catch((error) => error);
  }

  async delete(id: string): Promise<User> {
    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('horses');
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }
}

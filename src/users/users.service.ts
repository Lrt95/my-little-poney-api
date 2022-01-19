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
    return await this.model.find().populate('horses').exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).populate('horses').exec();
  }

  async findOneByUserNameAndMail(userForgetDto: UserForgetDto): Promise<User> {
    return await this.model
      .findOne({ userName: userForgetDto.userName, email: userForgetDto.email })
      .populate('horses')
      .exec();
  }

  async findOneByPasswordAndMail(userDto: UserDto): Promise<User> {
    return await this.model
      .findOne({ password: userDto.password, email: userDto.email })
      .populate('horses')
      .exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result.populate('horses'));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .populate('horses')
      .exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).populate('horses').exec();
  }
}

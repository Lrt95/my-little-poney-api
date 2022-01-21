import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';
import { UserDto, UserForgetDto } from './dto/user.dto';
import { HorsesService } from '../horses/horses.service';
import { LessonsService } from '../lessons/lessons.service';
import { ContestsService } from '../contests/contests.service';
import { PartiesService } from '../parties/parties.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
    @Inject(forwardRef(() => HorsesService))
    private readonly horsesService: HorsesService,
    private readonly lessonsService: LessonsService,
    private readonly contestsService: ContestsService,
    private readonly partiesService: PartiesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model
      .find()
      .exec()
      .catch((error) => error);
  }

  async findOne(id: string): Promise<User> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }

  async updateMany(filter: any, query: any): Promise<User> {
    return await this.model
      .updateMany(filter, query, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
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
          return result;
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }

  async findOneByIds(ids: string[]): Promise<User[]> {
    return await this.model
      .find({ _id: { $in: ids } })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown users' };
        }
      })
      .catch((error) => error);
  }

  async findOneByPasswordAndMail(userDto: UserDto): Promise<User> {
    return await this.model
      .findOne({ password: userDto.password, email: userDto.email })
      .exec()
      .then((result) => {
        if (result) {
          return result;
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
      .then((result) => result)
      .catch((error) => error);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'user unknowns' };
        }
      })
      .catch((error) => error);
  }

  async delete(id: string): Promise<User> {
    await this.horsesService.updateMany(
      { dpUsers: id },
      { $pull: { dpUsers: id } },
    );
    await this.horsesService.updateMany({ owner: id }, { $set: { owner: '' } });
    await this.lessonsService.updateMany({ user: id }, { $set: { user: '' } });
    await this.lessonsService.updateMany(
      { attendees: id },
      { $pull: { attendees: id } },
    );
    await this.contestsService.updateMany({ user: id }, { $set: { user: '' } });
    await this.contestsService.updateMany(
      { attendees: { $elemMatch: { user: id } } },
      { $pull: { attendees: { user: id } } },
    );
    await this.partiesService.updateMany({ user: id }, { $set: { user: '' } });
    await this.partiesService.updateMany(
      { attendees: { $elemMatch: { user: id } } },
      { $pull: { attendees: { user: id } } },
    );

    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown user' };
        }
      })
      .catch((error) => error);
  }
}

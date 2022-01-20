import { Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contest, ContestDocument } from './schema/contests.schema';

@Injectable()
export class ContestsService {
  constructor(
    @InjectModel(Contest.name) private readonly model: Model<ContestDocument>,
  ) {}

  async findAll(): Promise<Contest[]> {
    return await this.model
      .find()
      .populate('user attendees.user')
      .exec()
      .catch((error) => error);
  }

  async findOneById(id: string): Promise<Contest> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('user attendees.user');
        } else {
          throw { error: 'unknown contest' };
        }
      })
      .catch((error) => error);
  }

  async create(createContestDto: CreateContestDto): Promise<Contest> {
    return await new this.model({
      ...createContestDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result.populate('user attendees.user'))
      .catch((error) => error);
  }

  async update(
    id: string,
    updateContestDto: UpdateContestDto,
  ): Promise<Contest> {
    return await this.model
      .findByIdAndUpdate(id, updateContestDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('user attendees.user');
        } else {
          throw { error: 'unknown contest' };
        }
      })
      .catch((error) => {
        return error;
      });
  }

  async delete(id: string): Promise<Contest> {
    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result.populate('user attendees.user');
        } else {
          throw { error: 'unknown contest' };
        }
      })
      .catch((error) => error);
  }
}

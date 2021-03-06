import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateHorseDto } from './dto/create-horse.dto';
import { UpdateHorseDto } from './dto/update-horse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horse, HorseDocument } from './schema/horses.schema';
import { UsersService } from '../users/users.service';
import { log } from 'util';
import e from 'express';

@Injectable()
export class HorsesService {
  constructor(
    @InjectModel(Horse.name) private readonly model: Model<HorseDocument>,
    @Inject(forwardRef(() => HorsesService))
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Horse[]> {
    return await this.model
      .find()
      .exec()
      .catch((error) => error);
  }

  async findOneById(id: string): Promise<Horse> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown horse' };
        }
      })
      .catch((error) => error);
  }

  async create(createHorseDto: CreateHorseDto): Promise<Horse> {
    return await new this.model({
      ...createHorseDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result)
      .catch((error) => error);
  }

  async update(id: string, updateHorseDto: UpdateHorseDto): Promise<Horse> {
    return await this.model
      .findByIdAndUpdate(id, updateHorseDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknowns horse' };
        }
      })
      .catch((error) => error);
  }

  async updateFilter(id: string, filter: any): Promise<Horse> {
    return await this.model
      .findByIdAndUpdate(id, filter, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknowns horse' };
        }
      })
      .catch((error) => error);
  }

  async updateMany(filter: any, query: any): Promise<Horse> {
    return await this.model
      .updateMany(filter, query, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknowns horse' };
        }
      })
      .catch((error) => error);
  }

  async delete(id: string): Promise<Horse> {
    await this.usersService.updateMany(
      { horses: id },
      { $pull: { horses: id } },
    );

    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown horse' };
        }
      })
      .catch((error) => error);
  }
}

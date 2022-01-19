import { Injectable } from '@nestjs/common';
import { CreateHorseDto } from './dto/create-horse.dto';
import { UpdateHorseDto } from './dto/update-horse.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horse, HorseDocument } from './schema/horses.schema';

@Injectable()
export class HorsesService {
  constructor(
    @InjectModel(Horse.name) private readonly model: Model<HorseDocument>,
  ) {}

  async findAll(): Promise<Horse[]> {
    return await this.model.find().populate('owner dpUsers').exec();
  }

  async findOneById(id: string): Promise<Horse> {
    return await this.model.findById(id).populate('owner dpUsers').exec();
  }

  async create(createHorseDto: CreateHorseDto): Promise<Horse> {
    return await new this.model({
      ...createHorseDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result.populate('owner dpUsers'));
  }

  async update(id: string, updateHorseDto: UpdateHorseDto): Promise<Horse> {
    return await this.model
      .findByIdAndUpdate(id, updateHorseDto, { new: true })
      .populate('owner dpUsers')
      .exec();
  }

  async delete(id: string): Promise<Horse> {
    return await this.model
      .findByIdAndDelete(id)
      .populate('owner dpUsers')
      .exec();
  }
}

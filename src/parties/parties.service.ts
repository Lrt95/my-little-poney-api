import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Party, PartyDocument } from './schema/parties.schema';

@Injectable()
export class PartiesService {
  constructor(
    @InjectModel(Party.name) private readonly model: Model<PartyDocument>,
  ) {}

  async findAll(): Promise<Party[]> {
    return await this.model
      .find()
      .exec()
      .catch((error) => error);
  }

  async findOneById(id: string): Promise<Party> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown party' };
        }
      })
      .catch((error) => error);
  }

  async create(createPartyDto: CreatePartyDto): Promise<Party> {
    return await new this.model({
      ...createPartyDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result)
      .catch((error) => error);
  }

  async update(id: string, updatePartyDto: UpdatePartyDto): Promise<Party> {
    return await this.model
      .findByIdAndUpdate(id, updatePartyDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown party' };
        }
      })
      .catch((error) => {
        return error;
      });
  }

  async updateMany(filter: any, query: any): Promise<Party> {
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

  async delete(id: string): Promise<Party> {
    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown party' };
        }
      })
      .catch((error) => error);
  }
}

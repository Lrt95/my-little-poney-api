import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from './schema/lessons.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly model: Model<LessonDocument>,
  ) {}

  async findAll(): Promise<Lesson[]> {
    return await this.model
      .find()
      .exec()
      .catch((error) => error);
  }

  async findOneById(id: string): Promise<Lesson> {
    return await this.model
      .findById(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown lesson' };
        }
      })
      .catch((error) => error);
  }

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    return await new this.model({
      ...createLessonDto,
      createdAt: new Date(),
    })
      .save()
      .then((result) => result)
      .catch((error) => error);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    return await this.model
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown lesson' };
        }
      })
      .catch((error) => error);
  }

  async delete(id: string): Promise<Lesson> {
    return await this.model
      .findByIdAndDelete(id)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        } else {
          throw { error: 'unknown lesson' };
        }
      })
      .catch((error) => error);
  }
}

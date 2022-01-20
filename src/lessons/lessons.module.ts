import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schema/lessons.schema';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
})
export class LessonsModule {}

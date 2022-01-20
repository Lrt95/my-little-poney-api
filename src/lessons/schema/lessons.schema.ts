import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    default: null,
    ref: 'User',
    required: true,
  })
  user: string;

  @Prop({ required: true })
  ground: string;

  @Prop({ required: true })
  lessonDateTime: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  discipline: string;

  @Prop({ required: true, default: false })
  isValid: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], default: [] })
  attendees?: string[];

  @Prop({ required: true })
  createdAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

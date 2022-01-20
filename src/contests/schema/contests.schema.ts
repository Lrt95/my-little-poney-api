import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AttendeeContest } from '../dto/contest.dto';

export type ContestDocument = Contest & Document;

@Schema()
export class Contest {
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
  address: string;

  @Prop({ required: true })
  picturePath: string;

  @Prop({ required: true })
  contestDateTime: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true, default: false })
  isValid: boolean;

  @Prop({
    type: [
      raw({
        user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        level: { type: String, required: true },
      }),
    ],
    default: [],
  })
  attendees?: AttendeeContest[];
}

export const ContestSchema = SchemaFactory.createForClass(Contest);

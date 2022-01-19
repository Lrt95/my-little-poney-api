import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type HorseDocument = Horse & Document;

@Schema()
export class Horse {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  picturePath: string;

  @Prop({ required: true })
  dress: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  speciality: string;

  @Prop({ type: mongoose.Types.ObjectId, default: null, ref: 'User' })
  owner?: mongoose.Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], default: [] })
  dpUsers?: [mongoose.Types.ObjectId];
}

export const HorseSchema = SchemaFactory.createForClass(Horse);

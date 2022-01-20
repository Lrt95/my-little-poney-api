import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
const beautifyUnique = require('mongoose-unique-validator');

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '' })
  profilePicture?: string;

  @Prop({ default: 0 })
  age?: number;

  @Prop({ default: '' })
  FFELink?: string;

  @Prop({ default: '' })
  phoneNumber?: string;

  @Prop({ default: '' })
  role?: string;

  @Prop({ default: '' })
  type?: string;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'Horse' }],
    default: [],
  })
  horses?: string[];

  @Prop({ required: true })
  createdAt: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(beautifyUnique);

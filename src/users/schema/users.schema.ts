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

  @Prop()
  profilePicture?: string;

  @Prop()
  age?: number;

  @Prop()
  FFELink?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  role?: string;

  @Prop()
  type?: string;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'Horse' }],
    default: [],
  })
  horses?: [mongoose.Types.ObjectId];

  @Prop({ required: true })
  createdAt: Date;
}

export const UserSchema =
  SchemaFactory.createForClass(User).plugin(beautifyUnique);

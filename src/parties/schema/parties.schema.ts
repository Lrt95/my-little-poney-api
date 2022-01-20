import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AttendeeParty } from '../dto/party.dto';

export type PartyDocument = Party & Document;

@Schema()
export class Party {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  picturePath: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    default: null,
    ref: 'User',
    required: true,
  })
  user: string;

  @Prop({ required: true })
  theme: string;

  @Prop({ required: true, default: false })
  isValid: boolean;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  partyDateTime: Date;

  @Prop({
    type: [
      raw({
        user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        comment: { type: String, required: true },
      }),
    ],
    default: [],
  })
  attendees?: AttendeeParty[];
}

export const PartySchema = SchemaFactory.createForClass(Party);

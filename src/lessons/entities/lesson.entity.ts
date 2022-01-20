import {
  IsBoolean,
  IsDate,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Lesson {
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsString()
  ground: string;

  @IsNotEmpty()
  @IsDate()
  lessonDateTime: Date;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @IsString()
  discipline: string;

  @IsNotEmpty()
  @IsBoolean()
  isValid: boolean;

  @IsOptional()
  @IsMongoId({ each: true })
  attendees?: string[];

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}

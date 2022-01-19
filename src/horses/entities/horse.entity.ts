import {
  IsDate,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class HorseEntity {
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  picturePath: string;

  @IsNotEmpty()
  @IsString()
  dress: string;

  @IsNotEmpty()
  @IsString()
  race: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  speciality: string;

  @IsOptional()
  @IsMongoId()
  owner?: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsMongoId({ each: true })
  dpUsers?: string[];
}

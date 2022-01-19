import { IsDate, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserEntity {
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  FFELink?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsMongoId({ each: true })
  horses?: string[];

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}

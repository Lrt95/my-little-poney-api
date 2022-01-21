import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { HorsesModule } from '../horses/horses.module';
import { LessonsModule } from '../lessons/lessons.module';
import { ContestsModule } from '../contests/contests.module';
import { PartiesModule } from "../parties/parties.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HorsesModule,
    LessonsModule,
    ContestsModule,
    PartiesModule,
  ],
})
export class UsersModule {}

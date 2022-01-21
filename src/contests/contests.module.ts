import { Module } from '@nestjs/common';
import { ContestsService } from './contests.service';
import { ContestsController } from './contests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contest, ContestSchema } from './schema/contests.schema';

@Module({
  controllers: [ContestsController],
  providers: [ContestsService],
  imports: [
    MongooseModule.forFeature([{ name: Contest.name, schema: ContestSchema }]),
  ],
  exports: [ContestsService],
})
export class ContestsModule {}

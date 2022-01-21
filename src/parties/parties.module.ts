import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './schema/parties.schema';

@Module({
  controllers: [PartiesController],
  providers: [PartiesService],
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  exports: [PartiesService],
})
export class PartiesModule {}

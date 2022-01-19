import { Module } from '@nestjs/common';
import { HorsesService } from './horses.service';
import { HorsesController } from './horses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Horse, HorseSchema } from './schema/horses.schema';

@Module({
  controllers: [HorsesController],
  providers: [HorsesService],
  imports: [
    MongooseModule.forFeature([{ name: Horse.name, schema: HorseSchema }]),
  ],
})
export class HorsesModule {}

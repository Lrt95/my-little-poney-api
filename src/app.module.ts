import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { HorsesModule } from './horses/horses.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://upsqjnlwaimbknjy7hid:O9uxz9X41SqurSsRQ3M8@bpigf53tz6of0m0-mongodb.services.clever-cloud.com:27017/bpigf53tz6of0m0',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    UsersModule,
    HorsesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

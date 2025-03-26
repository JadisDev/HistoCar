import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { EventRepository } from './repositories/event.repository';
import { Event } from './entities/event';
import { CarModule } from '../car/car.module';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => CarModule),
    forwardRef(() => AuthModule),
    forwardRef(() => FileModule),
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventService, EventRepository],
})
export class EventModule {}

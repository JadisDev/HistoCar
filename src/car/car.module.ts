import { Module } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarController } from './controllers/car.controller';

@Module({
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

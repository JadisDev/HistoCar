import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { SearchBrachModel } from './services/search.service';

@Module({
  controllers: [CarController],
  providers: [SearchBrachModel],
})
export class CarModule {}

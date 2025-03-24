import { Module, forwardRef } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { SearchBrachModelService } from './services/search-branch-model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../car/entities/vehicles.entity';
import { UserVehicle } from '../car/entities/user-vehicle.entity';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { VehicleRepository } from './repositories/vehicle.repository';
import { VehicleService } from './services/vehicle.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, UserVehicle]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [CarController],
  providers: [SearchBrachModelService, VehicleRepository, VehicleService],
  exports: [SearchBrachModelService, VehicleService, VehicleRepository],
})
export class CarModule {}

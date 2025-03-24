import { Module, forwardRef } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { SearchBrachModelService } from './services/search-branch-model.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../car/entities/vehicles.entity';
import { UserVehicle } from '../car/entities/user-vehicle.entity';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, UserVehicle]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [CarController],
  providers: [SearchBrachModelService],
  exports: [SearchBrachModelService],
})
export class CarModule {}

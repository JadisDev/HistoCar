import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Vehicle } from '../entities/vehicles.entity';

@Injectable()
export class VehicleRepository extends GenericRepository<Vehicle> {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {
    super(vehicleRepository);
  }
}

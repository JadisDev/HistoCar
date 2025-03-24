import { IGenericService } from 'src/common/interfaces/generic-service.interface';
import { Vehicle } from '../entities/vehicles.entity';
import { CreateVehicleDto } from '../dto/user-vehicle.dto';

export interface IVehicle extends IGenericService<Vehicle> {
  createVehicleWithUsers(dto: CreateVehicleDto): Promise<Vehicle>;
}

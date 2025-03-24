import { GenericService } from 'src/common/services/generic.service';
import { IVehicle } from '../interfaces/vehicle.interface';
import { Vehicle } from '../entities/vehicles.entity';
import { VehicleRepository } from '../repositories/vehicle.repository';

export class VehicleService
  extends GenericService<Vehicle>
  implements IVehicle
{
  constructor(private readonly vehicleRepository: VehicleRepository) {
    super(vehicleRepository);
  }
}

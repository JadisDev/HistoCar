import { IGenericService } from 'src/common/interfaces/generic-service.interface';
import { Vehicle } from '../entities/vehicles.entity';

export interface IVehicle extends IGenericService<Vehicle> {}

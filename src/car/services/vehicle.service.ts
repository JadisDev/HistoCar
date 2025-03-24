import { EntityManager, In } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { GenericService } from 'src/common/services/generic.service';
import { Vehicle } from '../entities/vehicles.entity';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { User } from '../../user/entities/user.entity';
import { CreateVehicleDto } from '../dto/user-vehicle.dto';
import { IVehicle } from '../interfaces/vehicle.interface';
import { UserVehicle, UserVehicleRole } from '../entities/user-vehicle.entity';

export class VehicleService
  extends GenericService<Vehicle>
  implements IVehicle
{
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(vehicleRepository);
  }

  async createVehicleWithUsers(dto: CreateVehicleDto): Promise<Vehicle> {
    return await this.entityManager.transaction(async (manager) => {
      if (!dto.plate || dto.plate.trim() === '') {
        throw new BadRequestException('Plate is required.');
      }

      if (!dto.userVehicles || dto.userVehicles.length === 0) {
        throw new BadRequestException(
          'At least one user with role is required.',
        );
      }

      for (const userRel of dto.userVehicles) {
        if (!userRel.userId || !userRel.role) {
          throw new BadRequestException(
            'Each user must have a valid userId and role.',
          );
        }
        if (!Object.values(UserVehicleRole).includes(userRel.role)) {
          throw new BadRequestException(`Invalid role: ${userRel.role}`);
        }
      }

      const userIds = dto.userVehicles.map((rel) => rel.userId);
      const users = await manager.find(User, {
        where: {
          id: In(userIds),
        },
      });
      if (users.length !== userIds.length) {
        throw new BadRequestException('Some users were not found.');
      }

      const vehicle = manager.create(Vehicle, {
        plate: dto.plate,
        brand: dto.brand,
        model: dto.model,
        year: dto.year,
        chassis: dto.chassis,
        currentKm: dto.currentKm,
        state: dto.state,
        city: dto.city,
      });
      await manager.save(vehicle);

      const userVehicleEntities = dto.userVehicles.map((rel) =>
        manager.create(UserVehicle, {
          user: { id: rel.userId },
          vehicle: { id: vehicle.id },
          role: rel.role,
        }),
      );

      await manager.save(userVehicleEntities);

      return vehicle;
    });
  }
}

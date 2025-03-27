import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericService } from 'src/common/services/generic.service';

import { Share } from '../entities/shared';
import { IShareService } from '../interfaces/shared-service.interface';
import { SharedRepository } from '../repositories/shared.repository';
import { CreateShareDto } from '../dto/shared.dto';
import { VehicleRepository } from '../../car/repositories/vehicle.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class ShareService
  extends GenericService<Share>
  implements IShareService
{
  constructor(
    private readonly shareRepository: SharedRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {
    super(shareRepository);
  }

  async store(dto: CreateShareDto): Promise<Share> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: dto.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const share = this.shareRepository.create({
      vehicle,
      token: randomUUID(),
      password: dto.password,
      expiresAt,
    });

    return share;
  }
}

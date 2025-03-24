import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GenericService } from 'src/common/services/generic.service';

import { Event, EventType } from '../entities/event';
import { IEventService } from '../interfaces/event-service.interface';
import { EventRepository } from '../repositories/event.repository';
import { CreateEventDto } from '../dto/event.dto';
import { VehicleRepository } from 'src/car/repositories/vehicle.repository';

@Injectable()
export class EventService
  extends GenericService<Event>
  implements IEventService
{
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {
    super(eventRepository);
  }

  async store(eventData: CreateEventDto): Promise<Event> {
    if (!eventData.vehicleId) {
      throw new BadRequestException('Vehicle ID is required');
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: { id: eventData.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const event = this.eventRepository.create({
      vehicle: vehicle,
      type: (eventData.type ?? EventType.INSPECTION) as EventType,
      title: eventData.title,
      description: eventData.description,
      amount: eventData.value ?? 0,
      eventDate: eventData.eventDate,
      eventKm: eventData.eventKm,
      garage: eventData.workshop,
      attachmentUrl: eventData.attachmentUrl,
    });

    return event;
  }
}

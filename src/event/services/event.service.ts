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
import { GoogleDriveService } from 'src/file/services/file.service';
import * as path from 'path';

@Injectable()
export class EventService
  extends GenericService<Event>
  implements IEventService
{
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly vehicleRepository: VehicleRepository,
    private readonly fileService: GoogleDriveService,
  ) {
    super(eventRepository);
  }

  async store(eventData: CreateEventDto, file?: string): Promise<Event> {
    if (!eventData.vehicleId) {
      throw new BadRequestException('Vehicle ID is required');
    }

    const vehicle = await this.vehicleRepository.findOne({
      where: { id: eventData.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    let attachmentUrl: string | undefined;

    if (file) {
      try {
        const fileExtension = path.extname(file);
        const fileName = `event_${Date.now()}${fileExtension}`;
        const fileId = await this.fileService.uploadFile(file, fileName);
        attachmentUrl = `https://drive.google.com/uc?id=${fileId}`;
      } catch (error) {
        console.error('Error uploading file to Google Drive:', error);
        throw new BadRequestException('Failed to upload file');
      }
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
      attachmentUrl,
    });

    return event;
  }
}

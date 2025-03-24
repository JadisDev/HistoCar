import { IGenericService } from 'src/common/interfaces/generic-service.interface';
import { Event } from '../entities/event';
import { CreateEventDto } from '../dto/event.dto';

export interface IEventService extends IGenericService<Event> {
  store(eventData: CreateEventDto): Promise<Event>;
}

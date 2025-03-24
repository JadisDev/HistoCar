import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventDto } from '../dto/event.dto';
import { Event } from '../entities/event';

@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
    type: Event,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  async create(@Body() eventData: CreateEventDto): Promise<Event> {
    return await this.eventService.store(eventData);
  }
}

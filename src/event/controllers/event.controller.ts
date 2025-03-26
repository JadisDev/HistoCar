import {
  Controller,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventService } from '../services/event.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventDto } from '../dto/event.dto';
import { Event } from '../entities/event';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event with an optional image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Event data and image file',
    type: CreateEventDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Event successfully created',
    type: Event,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() eventData: CreateEventDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Event> {
    let tempPath: string | undefined;

    if (file) {
      const tempDir = path.join(__dirname, '..', '..', 'temp');
      tempPath = path.join(tempDir, file.originalname);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      fs.writeFileSync(tempPath, file.buffer);
    }

    try {
      return await this.eventService.store(eventData, tempPath);
    } finally {
      if (tempPath && fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
}

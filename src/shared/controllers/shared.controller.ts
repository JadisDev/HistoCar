import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ShareService } from '../services/shared.service';
import { CreateShareDto } from '../dto/shared.dto';
import { Share } from '../entities/shared';

@ApiTags('Share')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shares')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new share for a vehicle' })
  @ApiBody({
    description:
      'Create a new share by providing vehicle ID, password (optional), and expiration date (optional)',
    type: CreateShareDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Share successfully created',
    type: Share,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  async createShare(@Body() createShareDto: CreateShareDto): Promise<Share> {
    return this.shareService.store(createShareDto);
  }
}

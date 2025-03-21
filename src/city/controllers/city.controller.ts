import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CityService } from '../services/city.service';

@ApiTags('City')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('City')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'List states' })
  @ApiResponse({
    status: 200,
    description: 'List states',
  })
  @Get('states')
  async findAllStates() {
    return await this.cityService.getStates();
  }

  @ApiOperation({ summary: 'List Cities' })
  @ApiResponse({
    status: 200,
    description: 'List Cities',
  })
  @Get('cities/:uf')
  async getCitiesByUf(@Param('uf') uf: string) {
    return await this.cityService.getCitiesByUf(uf);
  }

  @ApiOperation({ summary: 'List Cities by name' })
  @ApiResponse({
    status: 200,
    description: 'List Cities by name',
  })
  @Get(':uf/search')
  async searchCitiesByName(
    @Param('uf') uf: string,
    @Query('search') search: string,
  ) {
    return await this.cityService.searchCitiesByName(uf, search);
  }
}

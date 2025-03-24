import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModelDto } from '../dto/model.dto';
import { BranchDto } from '../dto/branch.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchBrachModelService } from '../services/search-branch-model.service';
import { CreateVehicleDto } from '../dto/user-vehicle.dto';
import { Vehicle } from '../entities/vehicles.entity';
import { VehicleService } from '../services/vehicle.service';

@ApiTags('Car')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('car')
export class CarController {
  constructor(
    private readonly searchBrachModelService: SearchBrachModelService,
    private readonly vehicleService: VehicleService,
  ) {}

  @ApiOperation({ summary: 'List all branchs' })
  @ApiResponse({
    status: 200,
    description: 'List all branchs',
  })
  @Get('branches')
  async getBranches(): Promise<BranchDto[]> {
    return this.searchBrachModelService.getAllBranches();
  }

  @ApiOperation({ summary: 'List all models by branch' })
  @ApiResponse({
    status: 200,
    description: 'List all models by branch',
  })
  @ApiQuery({ name: 'search', required: false, type: String })
  @Get('models/:branchId')
  async getModelsByBranch(
    @Param('branchId') branchId: string,
    @Query('search') search?: string,
  ): Promise<ModelDto[]> {
    return this.searchBrachModelService.getModelsByName(branchId, search);
  }

  @ApiOperation({ summary: 'Create a vehicle with users' })
  @ApiResponse({
    status: 201,
    description: 'Vehicle created successfully',
    type: Vehicle,
  })
  @ApiBody({ type: CreateVehicleDto })
  @Post()
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehicleService.createVehicleWithUsers(createVehicleDto);
  }
}

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ModelDto } from '../dto/model.dto';
import { BranchDto } from '../dto/branch.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SearchBrachModelService } from '../services/search-branch-model.service';

@ApiTags('Car')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('car')
export class CarController {
  constructor(
    private readonly searchBrachModelService: SearchBrachModelService,
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
}

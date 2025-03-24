import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserVehicleRole } from '../entities/user-vehicle.entity';

export class UserVehicleDto {
  @ApiProperty({
    example: 'd84ec7c9-65e9-4ac4-b19e-a57c43fae07e',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: UserVehicleRole.OWNER,
    enum: UserVehicleRole,
  })
  @IsEnum(UserVehicleRole)
  role: UserVehicleRole;
}

export class CreateVehicleDto {
  @ApiProperty({
    example: 'ABC-1234',
  })
  @IsNotEmpty()
  @IsString()
  plate: string;

  @ApiProperty({ example: 'Toyota', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'Corolla', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ example: '2020', required: false })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ example: '9BWZZZ377VT004251', required: false })
  @IsOptional()
  @IsString()
  chassis?: string;

  @ApiProperty({ example: 45000, required: false })
  @IsOptional()
  currentKm?: number;

  @ApiProperty({ example: 'SP', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    type: [UserVehicleDto],
    example: [
      {
        userId: 'd84ec7c9-65e9-4ac4-b19e-a57c43fae07e',
        role: 'owner',
      },
      {
        userId: '7e26765d-4fbe-4126-b9ff-3ae1683577c6',
        role: 'collaborator',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserVehicleDto)
  userVehicles: UserVehicleDto[];
}

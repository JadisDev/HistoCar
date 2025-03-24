import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum EventType {
  PREVENTIVE_MAINTENANCE = 'preventive_maintenance',
  CORRECTIVE_MAINTENANCE = 'corrective_maintenance',
  CLAIM = 'claim',
  INSPECTION = 'inspection',
}

export class CreateEventDto {
  @ApiProperty({ example: '8205e038-ea86-462e-ae4e-994151a9a192' })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    enum: EventType,
    example: EventType.PREVENTIVE_MAINTENANCE,
  })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @ApiProperty({ example: 'Troca de óleo' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Troca de óleo do motor e filtro.' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 350.75 })
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({ example: '2025-03-23' })
  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsOptional()
  eventKm?: number;

  @ApiProperty({ example: 'Oficina Mecânica XYZ' })
  @IsString()
  @IsOptional()
  workshop?: string;

  @ApiProperty({ example: 'https://my-bucket.s3.amazonaws.com/attachment.jpg' })
  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}

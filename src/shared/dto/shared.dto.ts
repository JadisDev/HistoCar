import {
  IsUUID,
  IsOptional,
  IsString,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShareDto {
  @ApiProperty({
    description: 'ID do veículo a ser compartilhado',
    example: '8205e038-ea86-462e-ae4e-994151a9a192',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    description: 'Senha opcional para acessar o compartilhamento',
    example: 'mysecurepassword',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;
}

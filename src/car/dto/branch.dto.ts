import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class BranchDto {
  @ApiProperty({ example: '95', description: 'ID da branch' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ACURA', description: 'Nome da branch' })
  @IsString()
  label: string;

  @ApiProperty({ example: '95', description: 'Valor da branch' })
  @IsString()
  value: string;

  @ApiProperty({
    example: { friendlyPath: 'acura' },
    description: 'Dados extras da branch',
  })
  @IsObject()
  extraData: {
    friendlyPath: string;
  };
}

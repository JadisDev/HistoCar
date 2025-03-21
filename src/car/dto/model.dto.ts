import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class ModelDto {
  @ApiProperty({ example: '28', description: 'ID do modelo' })
  @IsString()
  name: string;

  @ApiProperty({ example: '147', description: 'Nome do modelo' })
  @IsString()
  label: string;

  @ApiProperty({ example: '28', description: 'Valor do modelo' })
  @IsString()
  value: string;

  @ApiProperty({ example: '25', description: 'ID da marca (parent)' })
  @IsString()
  parentId: string;

  @ApiProperty({
    example: { friendlyPath: '147' },
    description: 'Dados extras do modelo',
  })
  @IsObject()
  extraData: {
    friendlyPath: string;
  };
}

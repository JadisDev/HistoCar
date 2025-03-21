import { ApiProperty } from '@nestjs/swagger';

export class RegionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sigla: string;

  @ApiProperty()
  nome: string;
}

export class UfDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sigla: string;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: RegionDto })
  regiao: RegionDto;
}

export class MesorregiaoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: UfDto })
  UF: UfDto;
}

export class MicrorregiaoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: MesorregiaoDto })
  mesorregiao: MesorregiaoDto;
}

export class CityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nome: string;

  @ApiProperty({ type: MicrorregiaoDto })
  microrregiao: MicrorregiaoDto;
}

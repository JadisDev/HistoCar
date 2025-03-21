import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../constants';
import axios from 'axios';
import { StateDto } from '../dto/state.dto';
import { CityDto } from '../dto/city.dto';
import { ICityService } from '../interfaces/city-service.interface';

@Injectable()
export class CityService implements ICityService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async getCitiesByUf(uf: string): Promise<Array<CityDto>> {
    const cacheKey = `cities-${uf}`;
    let cities = await this.redis.get(cacheKey);
    if (cities) {
      return JSON.parse(cities);
    }
    const { data } = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
    );
    await this.redis.set(cacheKey, JSON.stringify(data), 'EX', 604800);

    return data;
  }

  async getStates(): Promise<Array<StateDto>> {
    return [
      { name: 'Acre', uf: 'AC' },
      { name: 'Alagoas', uf: 'AL' },
      { name: 'Amapá', uf: 'AP' },
      { name: 'Amazonas', uf: 'AM' },
      { name: 'Bahia', uf: 'BA' },
      { name: 'Ceará', uf: 'CE' },
      { name: 'Distrito Federal', uf: 'DF' },
      { name: 'Espírito Santo', uf: 'ES' },
      { name: 'Goiás', uf: 'GO' },
      { name: 'Maranhão', uf: 'MA' },
      { name: 'Mato Grosso', uf: 'MT' },
      { name: 'Mato Grosso do Sul', uf: 'MS' },
      { name: 'Minas Gerais', uf: 'MG' },
      { name: 'Pará', uf: 'PA' },
      { name: 'Paraíba', uf: 'PB' },
      { name: 'Paraná', uf: 'PR' },
      { name: 'Pernambuco', uf: 'PE' },
      { name: 'Piauí', uf: 'PI' },
      { name: 'Rio de Janeiro', uf: 'RJ' },
      { name: 'Rio Grande do Norte', uf: 'RN' },
      { name: 'Rio Grande do Sul', uf: 'RS' },
      { name: 'Rondônia', uf: 'RO' },
      { name: 'Roraima', uf: 'RR' },
      { name: 'Santa Catarina', uf: 'SC' },
      { name: 'São Paulo', uf: 'SP' },
      { name: 'Sergipe', uf: 'SE' },
      { name: 'Tocantins', uf: 'TO' },
    ];
  }

  async searchCitiesByName(
    uf: string,
    search: string,
  ): Promise<Array<CityDto>> {
    const cities = await this.getCitiesByUf(uf);

    const filteredCities = cities.filter((city: CityDto) =>
      city.nome.toLowerCase().startsWith(search.toLowerCase()),
    );

    return filteredCities;
  }
}

import { CityDto } from '../dto/city.dto';
import { StateDto } from '../dto/state.dto';

export interface ICityService {
  getCitiesByUf(uf: string): Promise<Array<CityDto>>;
  getStates(): Promise<Array<StateDto>>;
  searchCitiesByName(uf: string, search: string): Promise<Array<CityDto>>;
}

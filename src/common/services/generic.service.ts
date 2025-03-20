import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
} from 'typeorm';
import { IGenericRepository } from '../interfaces/generic-repository.interface';
import { IGenericService } from '../interfaces/generic-service.interface';

export class GenericService<T extends ObjectLiteral>
  implements IGenericService<T>
{
  constructor(private readonly genericRepository: IGenericRepository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.genericRepository.create(data);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.genericRepository.findAll(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.genericRepository.findOne(options);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.genericRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.genericRepository.delete(id);
  }
}

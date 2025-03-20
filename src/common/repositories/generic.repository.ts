import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
} from 'typeorm';
import { IGenericRepository } from '../interfaces/generic-repository.interface';

export class GenericRepository<T extends ObjectLiteral>
  implements IGenericRepository<T>
{
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async update(id: any, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data);
    const updated = await this.repository.findOne({ where: { id } as any });
    if (!updated) throw new Error('Entity not found after update');
    return updated;
  }

  async delete(id: any): Promise<void> {
    await this.repository.delete(id);
  }
}

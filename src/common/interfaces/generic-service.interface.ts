import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface IGenericService<T> {
  create(data: DeepPartial<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  remove(id: string): Promise<void>;
}

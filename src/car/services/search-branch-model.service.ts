import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

import { BranchDto } from '../dto/branch.dto';
import { ModelDto } from '../dto/model.dto';
import { REDIS_CLIENT } from 'src/city/constants';
import { readFile } from 'fs/promises';

@Injectable()
export class SearchBrachModelService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async getAllBranches(): Promise<BranchDto[]> {
    const cacheKey = 'car-branches';

    let cachedBranches = await this.redis.get(cacheKey);
    if (cachedBranches) {
      return JSON.parse(cachedBranches);
    }

    const branches = await this.fetchBranchesFromExternalSource();

    await this.redis.set(cacheKey, JSON.stringify(branches), 'EX', 86400);
    return branches;
  }

  async getModelsByName(branchId: string, search?: string): Promise<any[]> {
    const cacheKey = `car-models-${branchId}`;

    let cachedModels = await this.redis.get(cacheKey);
    if (!cachedModels) {
      const models = await this.fetchModelsFromExternalSource(branchId);
      await this.redis.set(cacheKey, JSON.stringify(models), 'EX', 86400);
      cachedModels = JSON.stringify(models);
    }

    const models = JSON.parse(cachedModels);

    if (search) {
      return models.filter((model) =>
        model.label.toLowerCase().startsWith(search.toLowerCase()),
      );
    }

    return models;
  }

  private async fetchBranchesFromExternalSource(): Promise<BranchDto[]> {
    const filePath = 'src/car/db/branchs.json';
    const fileContent = await readFile(filePath, 'utf-8');
    const branches: BranchDto[] = JSON.parse(fileContent);
    return branches;
  }

  private async fetchModelsFromExternalSource(
    branchId: string,
  ): Promise<ModelDto[]> {
    const filePath = `src/car/db/${branchId}.json`;
    const fileContent = await readFile(filePath, 'utf-8');
    const models: ModelDto[] = JSON.parse(fileContent);
    return models;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Share } from '../entities/shared';

@Injectable()
export class SharedRepository extends GenericRepository<Share> {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {
    super(shareRepository);
  }
}

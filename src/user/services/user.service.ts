import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenericService } from 'src/common/services/generic.service';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UserService extends GenericService<User> implements IUserService {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async create(data: DeepPartial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error(`User with email ${data.email} already exists`);
    }

    console.log('------------------');
    console.warn({ data });

    return await this.userRepository.create(data);
  }

  async validateUserPassword(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}

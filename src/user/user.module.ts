import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { CarModule } from '../car/car.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CarModule),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

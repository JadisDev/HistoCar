import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/shared';
import { AuthModule } from 'src/auth/auth.module';
import { ShareController } from './controllers/shared.controller';
import { ShareService } from './services/shared.service';
import { SharedRepository } from './repositories/shared.repository';
import { CarModule } from '../car/car.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share]),
    forwardRef(() => AuthModule),
    forwardRef(() => CarModule),
  ],
  controllers: [ShareController],
  providers: [ShareService, SharedRepository],
  exports: [ShareService],
})
export class SharedModule {}

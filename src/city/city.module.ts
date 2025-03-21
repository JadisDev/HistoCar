import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './constants';
import { CityController } from './controllers/city.controller';
import { CityService } from './services/city.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST || 'redis',
          port: parseInt(process.env.REDIS_PORT || '6379', 10),
        });
      },
    },
    CityService,
  ],
  controllers: [CityController],
  exports: [REDIS_CLIENT, CityService],
})
export class CityModule {}

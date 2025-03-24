import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controllers/auth.controller';
import { CityModule } from './city/city.module';
import { CityController } from './city/controllers/city.controller';
import { CarModule } from './car/car.module';
import { CarController } from './car/controllers/car.controller';
import { Vehicle } from './car/entities/vehicles.entity';
import { UserVehicle } from './car/entities/user-vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      entities: [User, Vehicle, UserVehicle],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CityModule,
    CarModule,
  ],
  controllers: [AppController, AuthController, CityController, CarController],
  providers: [AppService],
})
export class AppModule {}

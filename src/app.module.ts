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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST!,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      entities: [User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CityModule,
  ],
  controllers: [AppController, AuthController, CityController],
  providers: [AppService],
})
export class AppModule {}

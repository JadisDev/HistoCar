import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Vehicle } from '../car/entities/vehicles.entity';
import { UserVehicle } from '../car/entities/user-vehicle.entity';
import { Event } from '../event/entities/event';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: [User, Vehicle, UserVehicle, Event],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

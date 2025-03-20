import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: [User],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

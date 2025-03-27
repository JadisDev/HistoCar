import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserVehicle } from '../entities/user-vehicle.entity';
import { Share } from '../../shared/entities/shared';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  year?: string;

  @Column({ nullable: true })
  chassis?: string;

  @Column({ nullable: true })
  currentKm?: number;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserVehicle, (userVehicle) => userVehicle.vehicle)
  userVehicles: UserVehicle[];

  @OneToMany(() => Share, (share) => share.vehicle, { cascade: true })
  shares: Share[];
}

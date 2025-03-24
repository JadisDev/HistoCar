// src/event/entities/event.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Vehicle } from '../../car/entities/vehicles.entity';

export enum EventType {
  PREVENTIVE_MAINTENANCE = 'preventive_maintenance',
  CORRECTIVE_MAINTENANCE = 'corrective_maintenance',
  CLAIM = 'claim',
  INSPECTION = 'inspection',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type: EventType;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { nullable: true })
  amount: number;

  @Column({ type: 'date', nullable: true })
  eventDate: Date;

  @Column({ nullable: true })
  eventKm: number;

  @Column({ nullable: true })
  garage: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { BaseModel } from '@/models/base.model';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('payments')
export class Payment extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'pay_type' })
  payType!: string;

  @Column({ type: 'boolean', name: 'payment_status', default: false })
  paymentStatus!: boolean;
}

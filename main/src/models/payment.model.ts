import { BaseModel } from '@/models/base.model';
import { Order } from '@/models/order.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne
} from 'typeorm';

@Entity('payments')
export class Payment extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'pay_type' })
  payType!: string;

  @Column({ type: 'boolean', name: 'payment_status', default: false })
  paymentStatus!: boolean;

  @Column()
  amount!: number;

  @Column({ type: 'jsonb', name: 'pay_info', nullable: true })
  payInfo?: any;

  @OneToOne(() => Order, (order) => order.payment)
  order!: Order;
}

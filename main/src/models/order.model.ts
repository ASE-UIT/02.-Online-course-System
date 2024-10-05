import { BaseModel } from '@/models/base.model';
import { OrderItem } from '@/models/order_item.model';
import { Payment } from '@/models/payment.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('orders')
export class Order extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', name: 'total_price' })
  totalPrice!: number;

  @ManyToOne(() => Payment, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: Promise<OrderItem[]>;
}

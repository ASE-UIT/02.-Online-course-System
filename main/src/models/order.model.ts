import { OrderStatus } from '@/enums/order-status.enum';
import { BaseModel } from '@/models/base.model';
import { OrderItem } from '@/models/order_item.model';
import { Payment } from '@/models/payment.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('orders')
export class Order extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal', name: 'total_price' })
  totalPrice!: number;

  @Column({ name: 'payment_id', nullable: true })
  paymentId?: string;

  @OneToOne(() => Payment, { nullable: true, onDelete: 'SET NULL', cascade: true })
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items!: OrderItem[];

  @Column({ name: 'student_id' })
  studentId!: string;

  @ManyToOne(() => Student, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ name: 'status', type: 'enum', enum: OrderStatus, default: OrderStatus.WAITING_FOR_PAYMENT })
  status!: string;

  @Column({ name: 'customer_fullname', nullable: true })
  customerFullname?: string;

  @Column({ name: 'customer_email', nullable: true })
  customerEmail?: string;

  @Column({ name: 'customer_phone', nullable: true })
  customerPhone?: string;
}

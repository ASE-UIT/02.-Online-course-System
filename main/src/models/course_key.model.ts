import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Order } from '@/models/order.model';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_keys')
export class CourseKey extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  key!: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Column({ default: false, name: 'is_used' })
  isUsed!: boolean;
}

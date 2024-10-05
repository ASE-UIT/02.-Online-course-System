import { Course } from '@/models/course.model';
import { CourseKey } from '@/models/course_key.model';
import { Order } from '@/models/order.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('orders_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'decimal' })
  discount!: number;

  @ManyToOne(() => Course, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @ManyToOne(() => Student, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @ManyToOne(() => Order, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => CourseKey, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'course_key' })
  courseKey!: CourseKey;
}

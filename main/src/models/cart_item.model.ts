import { Cart } from '@/models/cart.model';
import { Course } from '@/models/course.model';
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ name: 'cart_id' })
  cartId!: string;

  @PrimaryColumn({ name: 'course_id' })
  courseId!: string;

  @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;
}

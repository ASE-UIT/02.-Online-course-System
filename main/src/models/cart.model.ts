import { CartItem } from '@/models/cart_item.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'student_id' })
  studentId!: string;

  @OneToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true, eager: true })
  items!: CartItem[];
}

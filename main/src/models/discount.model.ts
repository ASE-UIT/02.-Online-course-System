import { BaseModel } from '@/models/base.model';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('discounts')
export class Discount extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150, nullable: true })
  code!: string;

  @Column({ type: 'decimal', nullable: true, name: 'discount_amount' })
  discountAmount!: number;

  @Column({ type: 'decimal', nullable: true, name: 'discount_percentage' })
  discountPercentage!: number;

  @Column({ type: 'date', name: 'start_date' })
  startDate!: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate!: Date;
}

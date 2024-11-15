import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { BaseModel } from '@/models/base.model';
import { CourseCategory } from '@/models/course_category.model';
import { Discount } from '@/models/discount.model';
import { Lecturer } from '@/models/lecturer.model';
import { Lesson } from '@/models/lesson.model';
import { LessonPart } from '@/models/lesson_part.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('courses')
export class Course extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'text', nullable: true })
  thumbnail?: string;

  @Column({ type: 'decimal' })
  price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 1 })
  duration!: number;

  @Column({ type: 'enum', enum: DifficultyLevel, default: DifficultyLevel.easy, name: 'difficulty_level' })
  difficultyLevel?: string;

  @Column({ type: 'date', nullable: true, name: 'start_date' })
  startDate?: Date;

  @Column({ type: 'date', nullable: true, name: 'end_date' })
  endDate?: Date;

  @Column({ name: 'is_approved', default: false })
  isApproved!: boolean;

  @Column({ name: 'category_id' })
  categoryId!: string;

  @ManyToOne(() => CourseCategory)
  @JoinColumn({ name: 'category_id' })
  category!: CourseCategory;

  @Column({ name: 'lecturer_id' })
  lecturerId!: string;

  @ManyToOne(() => Lecturer)
  @JoinColumn({ name: 'lecturer_id' })
  lecturer!: Lecturer;

  @ManyToOne(() => Discount, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'discount_id' })
  discount!: Discount;

  @OneToMany(() => LessonPart, (lessonPart) => lessonPart.course, { cascade: true })
  lessonParts!: LessonPart[];
}

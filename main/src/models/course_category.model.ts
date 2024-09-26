import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('course_categories')
export class CourseCategory extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'text', nullable: true })
  thumbnail!: string;

  @OneToMany(() => Course, (course) => course.category)
  courses!: Promise<Course[]>;
}

import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Student } from '@/models/student.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_ratings')
export class CourseRating extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'course_id' })
  courseId!: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @Column({ name: 'rating_point', nullable: true })
  ratingPoint?: number;

  @Column({ name: 'comment', nullable: true })
  comment?: string;

  @Column({ name: 'student_id' })
  studentId!: string;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ name: 'liked', default: 0 })
  liked!: number;

  @Column({ name: 'unliked', default: 0 })
  unliked!: number;
}

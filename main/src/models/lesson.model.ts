import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Quiz } from '@/models/quiz.model';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('lessons')
export class Lesson extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: 'decimal', precision: 10, scale: 1 })
  duration!: number;

  @Column({ type: 'int', default: 1 })
  order!: number;

  @Column({ type: 'text', nullable: true, name: 'video_url' })
  videoUrl?: string;

  @Column({ type: 'simple-array', nullable: true, name: 'resource_link' })
  resourceLink?: string[];

  @Column({ name: 'parti_no', nullable: true })
  partNo?: number;

  @Column({ name: 'part_name', nullable: true })
  partName?: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @OneToMany(() => Quiz, (quiz) => quiz.lesson, { cascade: true, eager: true })
  quizzes!: Quiz[];

  @OneToMany(() => StudentCompleteLesson, (studentCompleteLesson) => studentCompleteLesson.lesson, { cascade: true })
  studentCompleteLessons!: Promise<StudentCompleteLesson[]>;
}

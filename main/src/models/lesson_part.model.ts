import { BaseModel } from '@/models/base.model';
import { Course } from '@/models/course.model';
import { Lesson } from '@/models/lesson.model';
import { Quiz } from '@/models/quiz.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lesson_parts')
export class LessonPart {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'part_no' })
  partNo!: number;

  @Column({ name: 'part_name', type: 'varchar', length: 100 })
  partName!: string;

  @Column({ name: 'course_id', nullable: true })
  courseId?: string;

  @ManyToOne(() => Course, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course!: Course;

  @OneToMany(() => Lesson, (lesson) => lesson.lessonPart, { cascade: true, eager: true })
  lessons!: Lesson[];

  @OneToMany(() => Quiz, (quiz) => quiz.lessonPart, { cascade: true, eager: true })
  quizzes!: Quiz[];
}

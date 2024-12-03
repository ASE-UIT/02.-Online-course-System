import { Lesson } from '@/models/lesson.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn, Column, JoinColumn } from 'typeorm';

@Entity('student_complete_lessons')
export class StudentCompleteLesson {
  @PrimaryColumn({ name: 'lesson_id' })
  lessonId!: string;

  @PrimaryColumn({ name: 'student_id' })
  studentId!: string;

  @ManyToOne(() => Lesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_id' })
  lesson!: Lesson;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @CreateDateColumn()
  @Column({ name: 'create_at' })
  createAt!: Date;

  @Column({ name: 'complete_at', nullable: true })
  completeAt!: Date;

  @Column({ name: 'progress', default: 0 })
  progress!: number;

  @Column({ name: 'is_complete', default: false })
  isComplete!: boolean;
}

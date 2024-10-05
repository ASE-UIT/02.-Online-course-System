import { Quiz } from '@/models/quiz.model';
import { Student } from '@/models/student.model';
import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn, Column, JoinColumn } from 'typeorm';

@Entity('student_complete_quizzes')
export class StudentCompleteQuiz {
  @PrimaryColumn({ name: 'quiz_id' })
  quizId!: string;

  @PrimaryColumn({ name: 'student_id' })
  studentId!: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @CreateDateColumn()
  @Column({ name: 'create_at' })
  createAt!: Date;
}

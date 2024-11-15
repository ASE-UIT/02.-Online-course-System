import { QuizChoiceEnum } from '@/enums/quiz-choice.enum';
import { BaseModel } from '@/models/base.model';
import { Lesson } from '@/models/lesson.model';
import { LessonPart } from '@/models/lesson_part.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('quizzes')
export class Quiz extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'int', default: 1 })
  order!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  explanation?: string;

  @Column({ type: 'text', name: 'choice_a', nullable: true })
  choiceA?: string;

  @Column({ type: 'text', name: 'choice_b', nullable: true })
  choiceB?: string;

  @Column({ type: 'text', name: 'choice_c', nullable: true })
  choiceC?: string;

  @Column({ type: 'text', name: 'choice_d', nullable: true })
  choiceD?: string;

  @Column({ type: 'simple-array', nullable: true, name: 'correct_choices' })
  correctChoices?: string[];

  @Column({ name: 'lesson_part_id', nullable: true })
  lessonPartId?: string;

  @ManyToOne(() => LessonPart, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lesson_part_id' })
  lessonPart!: LessonPart;

  @OneToMany(() => StudentCompleteQuiz, (studentCompleteQuiz) => studentCompleteQuiz.quiz, { cascade: true })
  studentCompleteQuizzes!: Promise<StudentCompleteQuiz[]>;
}

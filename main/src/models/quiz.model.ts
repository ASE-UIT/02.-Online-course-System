import { QuizChoiceEnum } from '@/enums/quiz-choice.enum';
import { BaseModel } from '@/models/base.model';
import { Lesson } from '@/models/lesson.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('quizzes')
export class Quiz extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', name: 'choice_a' })
  choiceA!: string;

  @Column({ type: 'text', name: 'choice_b' })
  choiceB!: string;

  @Column({ type: 'text', name: 'choice_c' })
  choiceC!: string;

  @Column({ type: 'text', name: 'choice_d' })
  choiceD!: string;

  @Column({ type: 'enum', enum: QuizChoiceEnum, default: QuizChoiceEnum.A, name: 'correct_choice' })
  correctChoice!: QuizChoiceEnum;

  @ManyToOne(() => Lesson)
  @JoinColumn({ name: 'lesson_id' })
  lesson!: Lesson;

  @OneToMany(() => StudentCompleteQuiz, (studentCompleteQuiz) => studentCompleteQuiz.quiz, { cascade: true })
  studentCompleteQuizzes!: Promise<StudentCompleteQuiz[]>;
}

import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { Quiz } from '@/models/quiz.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { AnswerQuizRes } from '@/dto/quizz/answer-quizz.res';

export interface IQuizService<T extends BaseModelType> extends IBaseCrudService<T> {
  // findByLessonId(lessonId: string): Promise<Quiz[]>;

  answerQuiz(quizId: string, studentId: string, choices: string[]): Promise<AnswerQuizRes>;
}

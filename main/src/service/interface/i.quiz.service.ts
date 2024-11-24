import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { Quiz } from '@/models/quiz.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';

export interface IQuizService<T extends BaseModelType> extends IBaseCrudService<T> {
  // findByLessonId(lessonId: string): Promise<Quiz[]>;

  answerQuiz(quizId: string | undefined, studentId: string | undefined, choice: string | undefined): Promise<boolean>;
}

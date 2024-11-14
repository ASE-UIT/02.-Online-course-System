import { Quiz } from '@/models/quiz.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { inject, injectable } from 'inversify';
import { studentCompleteQuizRepository } from '@/container/student_complete_quiz.container';

@injectable()
export class QuizService extends BaseCrudService<Quiz> implements IQuizService<Quiz> {
  private quizRepository: IQuizRepository<Quiz>;
  private studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>;

  constructor(
    @inject('QuizRepository') quizRepository: IQuizRepository<Quiz>,
    @inject('StudentCompleteQuizRepository')
    studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>
  ) {
    super(quizRepository);
    this.quizRepository = quizRepository;
    this.studentCompleteQuizRepository = studentCompleteQuizRepository;
  }

  async findByLessonId(lessonId: string): Promise<Quiz[]> {
    return await this.quizRepository.findByLessonId(lessonId);
  }

  async answerQuiz(
    quizId: string | undefined,
    studentId: string | undefined,
    choice: string | undefined
  ): Promise<boolean> {
    const quiz = await this.quizRepository.findOne({ filter: { id: quizId } });
    if (quiz?.correctChoice === choice) {
      await this.studentCompleteQuizRepository.create({ data: { quizId, studentId } });
      return true;
    }
    return false;
  }
}

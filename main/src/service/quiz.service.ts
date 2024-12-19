import { Quiz } from '@/models/quiz.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { inject, injectable } from 'inversify';
import { studentCompleteQuizRepository } from '@/container/student_complete_quiz.container';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';
import { AnswerQuizRes } from '@/dto/quizz/answer-quizz.res';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { Enrollment } from '@/models/enrollment.model';

@injectable()
export class QuizService extends BaseCrudService<Quiz> implements IQuizService<Quiz> {
  private quizRepository: IQuizRepository<Quiz>;
  private studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>;
  private enrollmentRepository: IEnrollmentRepository<Enrollment>;

  constructor(
    @inject('QuizRepository') quizRepository: IQuizRepository<Quiz>,
    @inject('StudentCompleteQuizRepository')
    studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>,
    @inject('EnrollmentRepository') enrollmentRepository: IEnrollmentRepository<Enrollment>
  ) {
    super(quizRepository);
    this.quizRepository = quizRepository;
    this.studentCompleteQuizRepository = studentCompleteQuizRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  // async findByLessonId(lessonId: string): Promise<Quiz[]> {
  //   return await this.quizRepository.findByLessonId(lessonId);
  // }

  async answerQuiz(quizId: string, studentId: string, choices: string[]): Promise<AnswerQuizRes> {
    const quiz = await this.quizRepository.findOne({ filter: { id: quizId }, relations: ['lessonPart'] });

    if (!quiz) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Quiz not found');
    }

    const correctChoices = quiz.correctChoices;

    console.log('correctChoices', correctChoices);
    console.log('choices', choices);

    //All of the choices must be the same as the correct choices
    if (correctChoices!.length !== choices.length) {
      return {
        answerResult: false
      };
    }

    for (const choice of choices) {
      if (!correctChoices!.includes(choice)) {
        return {
          answerResult: false
        };
      }
    }

    await this.studentCompleteQuizRepository.create({ data: { quizId, studentId } });

    //Update enrollment completion percentage
    this.enrollmentRepository.updateCompletionPercentage(quiz!.lessonPart!.courseId!, studentId);

    return {
      answerResult: true
    };
  }
}

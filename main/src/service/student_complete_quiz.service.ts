import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentCompleteQuizService } from '@/service/interface/i.student_complete_quiz.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteQuizService
  extends BaseCrudService<StudentCompleteQuiz>
  implements IStudentCompleteQuizService<StudentCompleteQuiz>
{
  private studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>;

  constructor(
    @inject('StudentCompleteQuizRepository')
    studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>
  ) {
    super(studentCompleteQuizRepository);
    this.studentCompleteQuizRepository = studentCompleteQuizRepository;
  }
}

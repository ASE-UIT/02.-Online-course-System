import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { IStudentCompleteLessonRepository } from '@/repository/interface/i.student_complete_lesson.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteLessonService
  extends BaseCrudService<StudentCompleteLesson>
  implements IStudentCompleteLessonService<StudentCompleteLesson>
{
  private studentCompleteLessonRepository: IStudentCompleteLessonRepository<StudentCompleteLesson>;

  constructor(
    @inject('StudentCompleteLessonRepository')
    studentCompleteLessonRepository: IStudentCompleteLessonRepository<StudentCompleteLesson>
  ) {
    super(studentCompleteLessonRepository);
    this.studentCompleteLessonRepository = studentCompleteLessonRepository;
  }
}

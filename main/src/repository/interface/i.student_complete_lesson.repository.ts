import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IStudentCompleteLessonRepository<T> extends IBaseRepository<T> {
  findManyByCourseIdAndStudentId(courseId: string, studentId: string): Promise<StudentCompleteLesson[]>;
}

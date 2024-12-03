import { GetLearningProgressRes } from '@/dto/student_complete_lesson/get-learning-progress.res';
import { UpdateStudentCompleteLessonReq } from '@/dto/student_complete_lesson/update-student-complete-lesson.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IStudentCompleteLessonService<T> extends IBaseCrudService<T> {
  getLearningProgress(studentId: string, courseId: string): Promise<GetLearningProgressRes>;
  updateProgress(data: UpdateStudentCompleteLessonReq, studentId: string): Promise<void>;
}

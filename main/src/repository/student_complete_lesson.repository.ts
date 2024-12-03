import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IStudentCompleteLessonRepository } from '@/repository/interface/i.student_complete_lesson.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class StudentCompleteLessonRepository
  extends BaseRepository<StudentCompleteLesson>
  implements IStudentCompleteLessonRepository<StudentCompleteLesson>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(StudentCompleteLesson));
  }

  async findManyByCourseIdAndStudentId(courseId: string, studentId: string): Promise<StudentCompleteLesson[]> {
    return this.ormRepository.find({
      where: {
        studentId: studentId,
        lesson: {
          lessonPart: {
            courseId: courseId
          }
        }
      }
    });
  }
}

import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class StudentCompleteQuizRepository
  extends BaseRepository<StudentCompleteQuiz>
  implements IStudentCompleteQuizRepository<StudentCompleteQuiz>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(StudentCompleteQuiz));
  }

  async countCompletedByCourseIdAndStudentId(courseId: string, studentId: string): Promise<number> {
    return await this.ormRepository.count({
      where: {
        studentId: studentId,
        quiz: {
          lessonPart: {
            courseId: courseId
          }
        }
      }
    });
  }

  async findQuizDoneByCourse(studentId: string, courseId: string): Promise<StudentCompleteQuiz[]> {
    console.log('QUERY FIND QUIZ DONE');
    console.log('courseId', courseId);

    return await this.ormRepository.find({
      where: {
        studentId: studentId,
        quiz: {
          lessonPart: {
            courseId: courseId
          }
        }
      },
      select: {
        quizId: true,
        createAt: true
      }
    });
  }
}
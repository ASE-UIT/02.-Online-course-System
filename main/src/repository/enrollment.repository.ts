import { Course } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Lesson } from '@/models/lesson.model';
import { Quiz } from '@/models/quiz.model';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource, Repository } from 'typeorm';

export class EnrollmentRepository extends BaseRepository<Enrollment> implements IEnrollmentRepository<Enrollment> {
  private lessonRepository: Repository<Lesson>;
  private studentCompleteLessonRepository: Repository<StudentCompleteLesson>;
  private quizRepository: Repository<Quiz>;
  private studentCompleteQuizRepository: Repository<StudentCompleteQuiz>;

  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Enrollment));
    this.lessonRepository = dataSource.getRepository(Lesson);
    this.studentCompleteLessonRepository = dataSource.getRepository(StudentCompleteLesson);
    this.quizRepository = dataSource.getRepository(Quiz);
    this.studentCompleteQuizRepository = dataSource.getRepository(StudentCompleteQuiz);
  }

  async updateCompletionPercentage(courseId: string, studentId: string): Promise<void> {
    console.log('courseId', courseId);

    const enrollment = await this.ormRepository.findOne({
      where: {
        courseId: courseId,
        studentId: studentId
      }
    });

    if (!enrollment) {
      throw new BaseError('ENROLLMENT_NOT_FOUND', 'Học viên chưa đăng ký khóa học này');
    }

    //Check if student complete all lesson
    const totalLesson = await this.lessonRepository.count({
      where: {
        lessonPart: {
          courseId: courseId
        }
      }
    });

    const totalCompleteLesson = await this.studentCompleteLessonRepository.count({
      where: {
        studentId: studentId,
        lesson: {
          lessonPart: {
            courseId: courseId
          }
        },
        isComplete: true
      }
    });

    //Check if student complete all quiz
    const totalQuiz = await this.quizRepository.count({
      where: {
        lessonPart: {
          courseId: courseId
        }
      }
    });
    const totalCompleteQuiz = await this.studentCompleteQuizRepository.count({
      where: {
        studentId: studentId,
        quiz: {
          lessonPart: {
            courseId: courseId
          }
        }
      }
    });

    console.log('totalLesson', totalLesson);
    console.log('totalCompleteLesson', totalCompleteLesson);
    console.log('totalQuiz', totalQuiz);
    console.log('totalCompleteQuiz', totalCompleteQuiz);

    if (totalCompleteLesson == totalLesson && totalCompleteQuiz == totalQuiz) {
      enrollment.status = 'completed';
      enrollment.completionDate = new Date();
      enrollment.completionPercentage = 100;

      await this.ormRepository.save(enrollment);

      return;
    }

    const courseCompletionPercentage = Math.round(
      ((totalCompleteLesson + totalCompleteQuiz) / (totalLesson + totalQuiz)) * 100
    );

    enrollment.completionPercentage = courseCompletionPercentage;

    console.log('enrollment', courseCompletionPercentage);

    await this.ormRepository.save(enrollment);
  }

  async findInProgress(studentId: string): Promise<Enrollment[]> {
    return await this.ormRepository
      .createQueryBuilder('enrollment')
      .where('enrollment.studentId = :studentId', { studentId: studentId })
      .andWhere('enrollment.status <> :completedStatus', { completedStatus: 'completed' })
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.lecturer', 'lecturer')
      .select([
        'enrollment.studentId',
        'enrollment.courseId',
        'enrollment.enrolledDate',
        'enrollment.status',
        'enrollment.completionPercentage',
        'enrollment.completionDate',
        'course.name',
        'course.nameEn',
        'course.shortDescription',
        'course.thumbnail',
        'lecturer.name'
      ])
      .getMany();
  }
}

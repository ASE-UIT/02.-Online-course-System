import { GetLearningProgressRes } from '@/dto/student_complete_lesson/get-learning-progress.res';
import { UpdateStudentCompleteLessonReq } from '@/dto/student_complete_lesson/update-student-complete-lesson.req';
import { Course } from '@/models/course.model';
import { Enrollment } from '@/models/enrollment.model';
import { Lesson } from '@/models/lesson.model';
import { Quiz } from '@/models/quiz.model';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { IStudentCompleteLessonRepository } from '@/repository/interface/i.student_complete_lesson.repository';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteLessonService
  extends BaseCrudService<StudentCompleteLesson>
  implements IStudentCompleteLessonService<StudentCompleteLesson>
{
  private studentCompleteLessonRepository: IStudentCompleteLessonRepository<StudentCompleteLesson>;
  private lessonRepository: ILessonRepository<Lesson>;
  private enrollmentRepository: IEnrollmentRepository<Enrollment>;
  private quizRepository: IQuizRepository<Quiz>;
  private studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>;

  constructor(
    @inject('StudentCompleteLessonRepository')
    studentCompleteLessonRepository: IStudentCompleteLessonRepository<StudentCompleteLesson>,
    @inject('LessonRepository') lessonRepository: ILessonRepository<Lesson>,
    @inject('EnrollmentRepository') enrollmentRepository: IEnrollmentRepository<Enrollment>,
    @inject('QuizRepository') quizRepository: IQuizRepository<Quiz>,
    @inject('StudentCompleteQuizRepository')
    studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>
  ) {
    super(studentCompleteLessonRepository);
    this.studentCompleteLessonRepository = studentCompleteLessonRepository;
    this.lessonRepository = lessonRepository;
    this.enrollmentRepository = enrollmentRepository;
    this.quizRepository = quizRepository;
    this.studentCompleteQuizRepository = studentCompleteQuizRepository;
  }

  async getLearningProgress(studentId: string, courseId: string): Promise<GetLearningProgressRes> {
    const learningProgress = await this.studentCompleteLessonRepository.findManyByCourseIdAndStudentId(
      courseId,
      studentId
    );

    const enrollment = await this.enrollmentRepository.findOne({
      filter: {
        courseId: courseId,
        studentId: studentId
      }
    });

    if (!enrollment) {
      throw new BaseError('ENROLLMENT_NOT_FOUND', 'Học viên chưa đăng ký khóa học này');
    }

    const totalCompleteLesson = learningProgress.filter((x) => x.isComplete).length;
    const totalLesson = await this.lessonRepository.countByCourseId(courseId);
    const courseProgress = enrollment.completionPercentage;

    const lessonLearnProgresses = learningProgress.map((lessonProgress) => {
      return {
        lessonId: lessonProgress.lessonId,
        progress: lessonProgress.progress,
        isComplete: lessonProgress.isComplete,
        completeAt: lessonProgress.completeAt
      };
    });

    const totalQuiz = await this.quizRepository.countByCourseId(courseId);
    const totalCompleteQuiz = await this.studentCompleteQuizRepository.countCompletedByCourseIdAndStudentId(
      courseId,
      studentId
    );

    return {
      courseProgress: courseProgress,
      lessonLearnProgresses: lessonLearnProgresses,
      totalLesson: totalLesson,
      totalCompleteLesson: totalCompleteLesson,
      totalQuiz: totalQuiz,
      totalCompleteQuiz: totalCompleteQuiz
    };
  }

  private async updateEnrollmentProgress(lessonId: string, studentId: string): Promise<void> {
    const lesson = await this.lessonRepository.findOne({
      filter: {
        id: lessonId
      },
      relations: ['lessonPart']
    });

    if (!lesson) {
      return;
    }
    console.log('update progress');

    this.enrollmentRepository.updateCompletionPercentage(lesson.lessonPart!.courseId!, studentId);
  }

  async updateProgress(data: UpdateStudentCompleteLessonReq, studentId: string): Promise<void> {
    let isComplete = false;
    if (data.progress >= 100) {
      isComplete = true;
    }

    const existsProgress = await this.studentCompleteLessonRepository.findOne({
      filter: {
        lessonId: data.lessonId,
        studentId: studentId
      }
    });

    if (existsProgress) {
      existsProgress.progress = data.progress;
      existsProgress.isComplete = isComplete;
      await this.studentCompleteLessonRepository.save(existsProgress);
    } else {
      const newProgress = new StudentCompleteLesson();
      newProgress.lessonId = data.lessonId;
      newProgress.studentId = studentId;
      newProgress.progress = data.progress;
      newProgress.isComplete = isComplete;
      newProgress.createAt = new Date();

      await this.studentCompleteLessonRepository.save(newProgress);
    }

    //Update enrollment status asyncronously
    this.updateEnrollmentProgress(data.lessonId, studentId);
  }
}

import { GetLearningProgressRes } from '@/dto/student_complete_lesson/get-learning-progress.res';
import { UpdateStudentCompleteLessonReq } from '@/dto/student_complete_lesson/update-student-complete-lesson.req';
import { Course } from '@/models/course.model';
import { Lesson } from '@/models/lesson.model';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
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
  private lessonRepository: ILessonRepository<Lesson>;

  constructor(
    @inject('StudentCompleteLessonRepository')
    studentCompleteLessonRepository: IStudentCompleteLessonRepository<StudentCompleteLesson>,
    @inject('LessonRepository') lessonRepository: ILessonRepository<Lesson>
  ) {
    super(studentCompleteLessonRepository);
    this.studentCompleteLessonRepository = studentCompleteLessonRepository;
    this.lessonRepository = lessonRepository;
  }

  async getLearningProgress(studentId: string, courseId: string): Promise<GetLearningProgressRes> {
    const learningProgress = await this.studentCompleteLessonRepository.findManyByCourseIdAndStudentId(
      courseId,
      studentId
    );

    const totalCompleteLesson = learningProgress.filter((x) => x.isComplete).length;
    const totalLesson = await this.lessonRepository.countByCourseId(courseId);
    const courseProgress = Math.round((totalCompleteLesson / totalLesson) * 100);

    const lessonLearnProgresses = learningProgress.map((lessonProgress) => {
      return {
        lessonId: lessonProgress.lessonId,
        progress: lessonProgress.progress,
        isComplete: lessonProgress.isComplete,
        completeAt: lessonProgress.completeAt
      };
    });

    return {
      courseProgress: courseProgress,
      lessonLearnProgresses: lessonLearnProgresses,
      totalLesson: totalLesson,
      totalCompleteLesson: totalCompleteLesson
    };
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
  }
}

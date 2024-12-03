import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { UpdateStudentCompleteLessonReq } from '@/dto/student_complete_lesson/update-student-complete-lesson.req';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { IStudentCompleteLessonService } from '@/service/interface/i.student_complete_lesson.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentCompleteLessonController {
  public common: IBaseCrudController<StudentCompleteLesson>;
  private studentCompleteLessonService: IStudentCompleteLessonService<StudentCompleteLesson>;
  constructor(
    @inject('StudentCompleteLessonService')
    studentCompleteLessonService: IStudentCompleteLessonService<StudentCompleteLesson>,
    @inject(ITYPES.Controller) common: IBaseCrudController<StudentCompleteLesson>
  ) {
    this.studentCompleteLessonService = studentCompleteLessonService;
    this.common = common;
  }

  /**
   ** PUT /student_complete_lessons
   */
  public async updateProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const data: UpdateStudentCompleteLessonReq = req.body;

      const studentId = req.user!.id;

      await this.studentCompleteLessonService.updateProgress(data, studentId);

      return res.send_ok('Progress updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   ** GET /student_complete_lessons/:courseId
   */
  public async getStudentCompleteLessonsByCourseId(req: Request, res: Response, next: NextFunction) {
    try {
      const studentId = req.user!.id;
      const courseId = req.params.courseId;

      const learningProgress = await this.studentCompleteLessonService.getLearningProgress(studentId, courseId);

      return res.send_ok('Learning progress retrieved successfully', learningProgress);
    } catch (error) {
      next(error);
    }
  }
}

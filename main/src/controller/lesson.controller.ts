import { getRepository } from 'typeorm';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Lesson } from '@/models/lesson.model';
import { ILessonService } from '@/service/interface/i.lesson.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';

@injectable()
export class LessonController {
  public common: IBaseCrudController<Lesson>;
  private lessonService: ILessonService<Lesson>;
  constructor(
    @inject('LessonService') lessonService: ILessonService<Lesson>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Lesson>
  ) {
    this.lessonService = lessonService;
    this.common = common;
  }

  static async markLessonComplete(req: Request, res: Response) {
    const { studentId, lessonId } = req.body;

    try {
      const lessonRepo = getRepository(Lesson);
      const completeLessonRepo = getRepository(StudentCompleteLesson);

      // Check if the lesson exists
      const lesson = await lessonRepo.findOne({ where: { id: lessonId }, relations: ['course'] });
      if (!lesson) {
        return res.status(404).json({ message: 'Không tìm thấy bài học' });
      }

      // Check if the lesson has already been completed by the student
      const existingRecord = await completeLessonRepo.findOne({ where: { lessonId, studentId } });
      if (existingRecord) {
        return res.status(400).json({ message: 'Bài học đã được đánh dấu hoàn thành' });
      }

      // Mark the lesson as completed
      const newRecord = completeLessonRepo.create({ lessonId, studentId });
      await completeLessonRepo.save(newRecord);

      return res.status(200).json({ message: 'Đánh dấu hoàn thành thành công' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Xảy ra lỗi khi đánh dấu hoàn thành bài học' });
    }
  }


  static async getCompletedLessons(req: Request, res: Response) {
    const { studentId, courseId } = req.params;

    try {
      const lessonRepo = getRepository(Lesson);
      const completeLessonRepo = getRepository(StudentCompleteLesson);

      // Get all lessons for the course
      const lessons = await lessonRepo.find({ where: { course: { id: courseId } } });

      if (lessons.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy bài học nào trong khóa học' });
      }

      // Get completed lessons for the student
      const completedLessons = await completeLessonRepo.find({
        where: { studentId },
        relations: ['lesson'],
      });

      // Filter completed lessons for the specific course
      const completedLessonIds = completedLessons.map((cl:StudentCompleteLesson) => cl.lessonId);
      const filteredCompletedLessons = lessons.filter((lesson:Lesson) => completedLessonIds.includes(lesson.id));

      return res.status(200).json(filteredCompletedLessons);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Xảy ra lỗi khi tìm kiếm bài học đã hoàn thành' });
    }
  }

}

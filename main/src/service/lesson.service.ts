import { Lesson } from '@/models/lesson.model';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILessonService } from '@/service/interface/i.lesson.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LessonService extends BaseCrudService<Lesson> implements ILessonService<Lesson> {
  private lessonRepository: ILessonRepository<Lesson>;

  constructor(@inject('LessonRepository') lessonRepository: ILessonRepository<Lesson>) {
    super(lessonRepository);
    this.lessonRepository = lessonRepository;
  }
}

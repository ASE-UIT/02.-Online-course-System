import { LessonPart } from '@/models/lesson_part.model';
import { ILessonPartRepository } from '@/repository/interface/i.lesson_part.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILessonPartService } from '@/service/interface/i.lesson_part.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LessonPartService extends BaseCrudService<LessonPart> implements ILessonPartService<LessonPart> {
  private lessonPartRepository: ILessonPartRepository<LessonPart>;

  constructor(@inject('LessonPartRepository') lessonPartRepository: ILessonPartRepository<LessonPart>) {
    super(lessonPartRepository);
    this.lessonPartRepository = lessonPartRepository;
  }
}

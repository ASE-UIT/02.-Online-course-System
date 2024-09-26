import { LessonController } from '@/controller/lesson.controller';
import { LessonService } from '@/service/lesson.service';
import { Lesson } from '@/models/lesson.model';
import { LessonRepository } from '@/repository/lesson.repository';
import { ILessonService } from '@/service/interface/i.lesson.service';
import { ILessonRepository } from '@/repository/interface/i.lesson.repository';
import { BaseContainer } from '@/container/base.container';

class LessonContainer extends BaseContainer {
  constructor() {
    super(Lesson);
    this.container.bind<ILessonService<Lesson>>('LessonService').to(LessonService);
    this.container.bind<ILessonRepository<Lesson>>('LessonRepository').to(LessonRepository);
    this.container.bind<LessonController>(LessonController).toSelf();
  }

  export() {
    const lessonController = this.container.get<LessonController>(LessonController);
    const lessonService = this.container.get<ILessonService<any>>('LessonService');
    return { lessonController, lessonService };
  }
}

const lessonContainer = new LessonContainer();
const { lessonController, lessonService } = lessonContainer.export();
export { lessonController, lessonService };

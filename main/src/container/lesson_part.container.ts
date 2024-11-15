import { LessonPartController } from '@/controller/lesson_part.controller';
import { LessonPartService } from '@/service/lesson_part.service';
import { LessonPart } from '@/models/lesson_part.model';
import { LessonPartRepository } from '@/repository/lesson_part.repository';
import { ILessonPartService } from '@/service/interface/i.lesson_part.service';
import { ILessonPartRepository } from '@/repository/interface/i.lesson_part.repository';
import { BaseContainer } from '@/container/base.container';

class LessonPartContainer extends BaseContainer {
  constructor() {
    super(LessonPart);
    this.container.bind<ILessonPartService<LessonPart>>('LessonPartService').to(LessonPartService);
    this.container.bind<ILessonPartRepository<LessonPart>>('LessonPartRepository').to(LessonPartRepository);
    this.container.bind<LessonPartController>(LessonPartController).toSelf();
  }

  export() {
    const lessonPartController = this.container.get<LessonPartController>(LessonPartController);
    const lessonPartService = this.container.get<ILessonPartService<any>>('LessonPartService');
    return { lessonPartController, lessonPartService };
  }
}

const lessonPartContainer = new LessonPartContainer();
const { lessonPartController, lessonPartService } = lessonPartContainer.export();
export { lessonPartController, lessonPartService };

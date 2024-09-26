import { LecturerController } from '@/controller/lecturer.controller';
import { LecturerService } from '@/service/lecturer.service';
import { Lecturer } from '@/models/lecturer.model';
import { LecturerRepository } from '@/repository/lecturer.repository';
import { ILecturerService } from '@/service/interface/i.lecturer.service';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { BaseContainer } from '@/container/base.container';

class LecturerContainer extends BaseContainer {
  constructor() {
    super(Lecturer);
    this.container.bind<ILecturerService<Lecturer>>('LecturerService').to(LecturerService);
    this.container.bind<ILecturerRepository<Lecturer>>('LecturerRepository').to(LecturerRepository);
    this.container.bind<LecturerController>(LecturerController).toSelf();
  }

  export() {
    const lecturerController = this.container.get<LecturerController>(LecturerController);
    const lecturerService = this.container.get<ILecturerService<any>>('LecturerService');
    return { lecturerController, lecturerService };
  }
}

const lecturerContainer = new LecturerContainer();
const { lecturerController, lecturerService } = lecturerContainer.export();
export { lecturerController, lecturerService };

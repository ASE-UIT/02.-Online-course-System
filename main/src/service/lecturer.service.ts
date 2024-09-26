import { Lecturer } from '@/models/lecturer.model';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ILecturerService } from '@/service/interface/i.lecturer.service';
import { inject, injectable } from 'inversify';

@injectable()
export class LecturerService extends BaseCrudService<Lecturer> implements ILecturerService<Lecturer> {
  private lecturerRepository: ILecturerRepository<Lecturer>;

  constructor(@inject('LecturerRepository') lecturerRepository: ILecturerRepository<Lecturer>) {
    super(lecturerRepository);
    this.lecturerRepository = lecturerRepository;
  }
}

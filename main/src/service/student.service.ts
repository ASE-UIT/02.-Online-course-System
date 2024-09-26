import { Student } from '@/models/student.model';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStudentService } from '@/service/interface/i.student.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StudentService extends BaseCrudService<Student> implements IStudentService<Student> {
  private studentRepository: IStudentRepository<Student>;

  constructor(@inject('StudentRepository') studentRepository: IStudentRepository<Student>) {
    super(studentRepository);
    this.studentRepository = studentRepository;
  }
}

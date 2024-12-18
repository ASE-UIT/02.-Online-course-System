import { Enrollment } from '@/models/enrollment.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class EnrollmentRepository extends BaseRepository<Enrollment> implements IEnrollmentRepository<Enrollment> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Enrollment));
  }

  async findInProgress(studentId: string): Promise<Enrollment[]> {
    return await this.ormRepository
      .createQueryBuilder('enrollment')
      .where('enrollment.studentId = :studentId', { studentId: studentId })
      .andWhere('enrollment.completionPercentage < :completionPercentage', { completionPercentage: 100 })
      .leftJoinAndSelect('enrollment.course', 'course')
      .leftJoinAndSelect('course.lecturer', 'lecturer')
      .select([
        'enrollment.studentId',
        'enrollment.courseId',
        'enrollment.enrolledDate',
        'enrollment.status',
        'enrollment.completionPercentage',
        'enrollment.completionDate',
        'course.name',
        'course.nameEn',
        'course.shortDescription',
        'course.thumbnail',
        'lecturer.name'
      ])
      .getMany();
  }
}

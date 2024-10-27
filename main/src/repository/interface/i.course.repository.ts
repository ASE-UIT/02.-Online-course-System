import { id } from 'inversify';
import { Course } from '@/models/course.model';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface ICourseRepository<T> extends IBaseRepository<T> {}

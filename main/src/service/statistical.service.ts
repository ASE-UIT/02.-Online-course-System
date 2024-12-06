import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Lecturer } from '@/models/lecturer.model';
import { Order } from '@/models/order.model';
import { Student } from '@/models/student.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStatisticalService } from '@/service/interface/i.statistical.service';
import { inject, injectable } from 'inversify';

@injectable()
export class StatisticalService implements IStatisticalService {
  private courseRepository: ICourseRepository<Course>;
  private lecturerRepository: ILecturerRepository<Lecturer>;
  private studentRepository: IStudentRepository<Student>;
  private orderRepository: IOrderRepository<Order>;
  private courseRatingRepository: ICourseRatingRepository<CourseRating>;

  constructor(
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('LecturerRepository') lecturerRepository: ILecturerRepository<Lecturer>,
    @inject('StudentRepository') studentRepository: IStudentRepository<Student>,
    @inject('OrderRepository') orderRepository: IOrderRepository<Order>,
    @inject('CourseRatingRepository') courseRatingRepository: ICourseRatingRepository<CourseRating>
  ) {
    this.courseRepository = courseRepository;
    this.lecturerRepository = lecturerRepository;
    this.studentRepository = studentRepository;
    this.orderRepository = orderRepository;
    this.courseRatingRepository = courseRatingRepository;
  }
}

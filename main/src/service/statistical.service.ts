import { StatisticalRevenueRes } from '@/dto/statistical/statistical-revenue.res';
import { StatisticalRes } from '@/dto/statistical/statistical.res';
import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Lecturer } from '@/models/lecturer.model';
import { Order } from '@/models/order.model';
import { Student } from '@/models/student.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IStatisticalRepository } from '@/repository/interface/i.statistical.repository';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { StatisticalRepository } from '@/repository/statistical.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IStatisticalService } from '@/service/interface/i.statistical.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';

@injectable()
export class StatisticalService implements IStatisticalService {
  private statisticalRepository: StatisticalRepository;
  private courseRepository: ICourseRepository<Course>;
  private lecturerRepository: ILecturerRepository<Lecturer>;
  private studentRepository: IStudentRepository<Student>;
  private orderRepository: IOrderRepository<Order>;
  private courseRatingRepository: ICourseRatingRepository<CourseRating>;

  constructor(
    @inject('StatisticalRepository') statisticalRepository: StatisticalRepository,
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
    this.statisticalRepository = statisticalRepository;
  }
  async getStatistics(time: number): Promise<StatisticalRes> {
    const statistics = await this.statisticalRepository.getStatisticsBetweenDates(time);
    const result = new StatisticalRes({
      revenue: statistics.revenue,
      newStudents: statistics.newStudents,
      newLecturer: statistics.newLecturer,
      newCourses: statistics.newCourses,
      coursesPurchased: statistics.coursesPurchased,
      courseRatings: statistics.courseRatings,
      averageRating: statistics.averageRating,
      revenuePercentage: statistics.revenuePercentage,
      newStudentsPercentage: statistics.newStudentsPercentage,
      newCoursesPercentage: statistics.newCoursesPercentage,
      newLecturerPercentage: statistics.newLecturerPercentage,
      coursesPurchasedPercentage: statistics.coursesPurchasedPercentage,
      courseRatingsPercentage: statistics.courseRatingsPercentage,
      averageRatingPercentage: statistics.averageRatingPercentage
    });
    return result;
  }
  async getDailyRevenue(): Promise<StatisticalRevenueRes> {
    const dailyRevenue = await this.statisticalRepository.getDailyRevenue();
    const result = new StatisticalRevenueRes({ revenue: dailyRevenue });
    return result;
  }
  async getWeekRevenue(): Promise<StatisticalRevenueRes> {
    const weekRevenue = await this.statisticalRepository.getWeeksRevenue();
    const result = new StatisticalRevenueRes({ revenue: weekRevenue });
    return result;
  }
  async getMonthRevenue(): Promise<StatisticalRevenueRes> {
    const monthRevenue = await this.statisticalRepository.getMonthsRevenue();
    const result = new StatisticalRevenueRes({ revenue: monthRevenue });
    return result;
  }
}

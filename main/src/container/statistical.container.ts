import { StatisticalController } from '@/controller/statistical.controller';
import { StatisticalService } from '@/service/statistical.service';
import { IStatisticalService } from '@/service/interface/i.statistical.service';
import { Container } from 'inversify';
import { DataSource } from 'typeorm';
import { ITYPES } from '@/types/interface.types';
import { AppDataSourceSingleton } from '@/database/db.datasource';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { courseRepository } from '@/container/course.container';
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { lecturerRepository } from '@/container/lecturer.container';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { studentRepository } from '@/container/student.container';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { orderRepository } from '@/container/order.container';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { courseRatingRepository } from '@/container/course_rating.container';
import { IStatisticalRepository } from '@/repository/interface/i.statistical.repository';
import { StatisticalRepository } from '@/repository/statistical.repository';

class StatisticalContainer {
  private container = new Container();

  constructor() {
    this.container.bind<DataSource>(ITYPES.Datasource).toConstantValue(AppDataSourceSingleton.getInstance());
    this.container.bind<IStatisticalService>('StatisticalService').to(StatisticalService);
    this.container.bind<StatisticalController>(StatisticalController).toSelf();

    //Import
    this.container.bind<ICourseRepository<any>>('CourseRepository').toConstantValue(courseRepository);
    this.container.bind<ILecturerRepository<any>>('LecturerRepository').toConstantValue(lecturerRepository);
    this.container.bind<IStudentRepository<any>>('StudentRepository').toConstantValue(studentRepository);
    this.container.bind<IOrderRepository<any>>('OrderRepository').toConstantValue(orderRepository);
    this.container.bind<ICourseRatingRepository<any>>('CourseRatingRepository').toConstantValue(courseRatingRepository);
    this.container.bind<IStatisticalRepository>('StatisticalRepository').to(StatisticalRepository);
  }

  export() {
    const statisticalController = this.container.get<StatisticalController>(StatisticalController);
    const statisticalService = this.container.get<IStatisticalService>('StatisticalService');
    return { statisticalController, statisticalService };
  }
}

const statisticalContainer = new StatisticalContainer();
const { statisticalController, statisticalService } = statisticalContainer.export();
export { statisticalController, statisticalService };

import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Lecturer } from '@/models/lecturer.model';
import { Order } from '@/models/order.model';
import { Student } from '@/models/student.model';
import { IStatisticalRepository } from '@/repository/interface/i.statistical.repository';
import { ITYPES } from '@/types/interface.types';
import { inject, injectable } from 'inversify';
import { Between, DataSource } from 'typeorm';

@injectable()
export class StatisticalRepository implements IStatisticalRepository {
  constructor(@inject(ITYPES.Datasource) private dataSource: DataSource) {}
  async getStatisticsBetweenDates(time: number): Promise<{
    revenue: number;
    revenuePercentage: number;
    newStudents: number;
    newStudentsPercentage: number;
    newLecturer: number;
    newLecturerPercentage: number;
    coursesPurchased: number;
    coursesPurchasedPercentage: number;
    newCourses: number;
    newCoursesPercentage: number;
    courseRatings: number;
    courseRatingsPercentage: number;
    averageRating: number;
    averageRatingPercentage: number;
  }> {
    const orderRepository = this.dataSource.getRepository(Order);
    const courseRepository = this.dataSource.getRepository(Course);
    const studentRepository = this.dataSource.getRepository(Student);
    const courseRatingRepository = this.dataSource.getRepository(CourseRating);
    const lecturerRepository = this.dataSource.getRepository(Lecturer);

    //hai mốc thời gian
    const currentTimeEnd = new Date();
    const currentTimeStart = new Date();
    currentTimeStart.setTime(currentTimeEnd.getTime() - (time * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000));
    const previousTimeEnd = new Date();
    previousTimeEnd.setTime(currentTimeEnd.getTime() - time * 24 * 60 * 60 * 1000);
    const previousTimeStart = new Date();
    previousTimeStart.setTime(currentTimeStart.getTime() - time * 24 * 60 * 60 * 1000);

    //tính doanh thu hiện tại
    const order = await orderRepository.find({
      where: { createAt: Between(currentTimeStart, currentTimeEnd), status: 'PAID' }
    });
    const revenue = order.reduce((acc, order) => acc + Number(order.totalPrice), 0);

    //tính doanh thu đợt trước
    const previousOrder = await orderRepository.find({
      where: { createAt: Between(previousTimeStart, previousTimeEnd), status: 'PAID' }
    });
    const previousRevenue = previousOrder.reduce((acc, order) => acc + Number(order.totalPrice), 0);

    //tính phần trăm doanh thu
    const revenuePercentage = PercentageChange(revenue, previousRevenue);

    //tính số học sinh mới hiện tại
    const newStudents = await studentRepository.count({
      where: { createAt: Between(currentTimeStart, currentTimeEnd) }
    });
    //tính số học sinh mới đợt trước
    const previousNewStudents = await studentRepository.count({
      where: { createAt: Between(previousTimeStart, previousTimeEnd) }
    });

    //tính phần trăm học sinh
    const newStudentsPercentage = PercentageChange(newStudents, previousNewStudents);

    //tính số giảng viên mới hiện tại
    const newLecturer = await lecturerRepository.count({
      where: { createAt: Between(currentTimeStart, currentTimeEnd) }
    });

    //tính số giảng viên mới đợt trước
    const previousNewLecturer = await lecturerRepository.count({
      where: { createAt: Between(previousTimeStart, previousTimeEnd) }
    });

    //tính phần trăm giảng viên
    const newLecturerPercentage = PercentageChange(newLecturer, previousNewLecturer);

    //tính số khóa học mới hiện tại
    const newCourses = await courseRepository.count({
      where: { createAt: Between(currentTimeStart, currentTimeEnd) }
    });

    //tính số khóa học mới đợt trước
    const previousNewCourses = await courseRepository.count({
      where: { createAt: Between(previousTimeStart, previousTimeEnd) }
    });

    //tính phần trăm khóa học
    const newCoursesPercentage = PercentageChange(newCourses, previousNewCourses);

    //tính số lượt mua hiện tại
    const courses = await orderRepository.find({
      where: { createAt: Between(currentTimeStart, currentTimeEnd), status: 'PAID' },
      relations: ['items']
    });
    const coursesPurchased = courses.reduce((acc, order) => {
      return acc + (Array.isArray(order.items) ? order.items.length : 0);
    }, 0);
    //tính số lượt mua đợt trước
    const previousCourses = await orderRepository.find({
      where: { createAt: Between(previousTimeStart, previousTimeEnd), status: 'PAID' },
      relations: ['items']
    });
    const previousCoursesPurchased = previousCourses.reduce((acc, order) => {
      return acc + (Array.isArray(order.items) ? order.items.length : 0);
    }, 0);
    //tính phần trăm số lượt mua
    const coursesPurchasedPercentage = PercentageChange(coursesPurchased, previousCoursesPurchased);

    //tính số lượt đánh giá khóa học
    const courseRatings = await courseRatingRepository.count({
      where: { createAt: Between(currentTimeStart, currentTimeEnd) }
    });

    //tính số lượt đánh giá đợt trước
    const previousCourseRatings = await courseRatingRepository.count({
      where: { createAt: Between(previousTimeStart, previousTimeEnd) }
    });

    //tính phần trăm số đánh giá
    const courseRatingsPercentage = PercentageChange(courseRatings, previousCourseRatings);

    //tính trung bình số sao
    const rating = await courseRatingRepository.find({
      where: { createAt: Between(currentTimeStart, currentTimeEnd) }
    });

    const averageRating =
      rating.length > 0 ? rating.reduce((acc, rating) => acc + (rating.ratingPoint ?? 0), 0) / rating.length : 0;
    //tính trung bình số sao đợt trước
    const previousRating = await courseRatingRepository.find({
      where: { createAt: Between(previousTimeStart, previousTimeEnd) }
    });
    const previousAverageRating =
      previousRating.length > 0
        ? previousRating.reduce((acc, rating) => acc + (rating.ratingPoint ?? 0), 0) / previousRating.length
        : 0;
    //tính phần trăm số đánh giá
    const averageRatingPercentage = PercentageChange(averageRating, previousAverageRating);

    return {
      revenue,
      revenuePercentage,
      newStudents,
      newStudentsPercentage,
      newLecturer,
      newLecturerPercentage,
      newCourses,
      newCoursesPercentage,
      coursesPurchased,
      coursesPurchasedPercentage,
      courseRatings,
      courseRatingsPercentage,
      averageRating,
      averageRatingPercentage
    };
  }
  async getDailyRevenue() {
    const ordersRepository = this.dataSource.getRepository(Order);
    const timeEnd = new Date();
    console.log(timeEnd);
    const timeStart = new Date();
    timeStart.setTime(timeEnd.getTime() - 6 * 24 * 60 * 60 * 1000);
    timeEnd.setHours(23, 59, 59, 999);
    const orders = await ordersRepository.find({
      where: { createAt: Between(timeStart, timeEnd), status: 'PAID' }
    });

    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(timeStart);
      day.setTime(timeStart.getTime() + (index + 1) * 24 * 60 * 60 * 1000);

      const startOfDay = new Date(day.setHours(0, 0, 0, 0));
      const endOfDay = new Date(day.setHours(23, 59, 59, 999));

      const dayRevenue = orders
        .filter((order) => order.createAt >= startOfDay && order.createAt <= endOfDay)
        .reduce((sum, order) => sum + Number(order.totalPrice), 0);

      return {
        date: startOfDay.toISOString().split('T')[0], // YYYY-MM-DD
        revenue: dayRevenue
      };
    });
  }
  async getWeeksRevenue() {
    const ordersRepository = this.dataSource.getRepository(Order);
    const timeEnd = new Date();
    const timeStart = new Date();
    timeStart.setDate(timeEnd.getDate() - 28);
    console.log(timeStart);
    const orders = await ordersRepository.find({
      where: { createAt: Between(timeStart, timeEnd), status: 'PAID' }
    });
    return Array.from({ length: 4 }, (_, index) => {
      const weekStart = new Date(timeStart);
      weekStart.setDate(timeStart.getDate() + (index + 1) * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      console.log(weekStart);
      console.log(weekEnd);
      const weekRevenue = orders
        .filter((order) => {
          return order.createAt >= weekStart && order.createAt <= weekEnd;
        })
        .reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);

      return {
        week: `Week ${4 - index}`,
        revenue: weekRevenue
      };
    }).reverse();
  }
  async getMonthsRevenue() {
    const ordersRepository = this.dataSource.getRepository(Order);
    const timeEnd = new Date();
    const timeStart = new Date(timeEnd);
    timeStart.setTime(timeEnd.getTime() - 365 * 24 * 60 * 60 * 1000);

    const orders = await ordersRepository.find({
      where: { createAt: Between(timeStart, timeEnd), status: 'PAID' }
    });

    return Array.from({ length: 12 }, (_, index) => {
      const month = new Date(timeStart);
      month.setMonth(timeStart.getMonth() + index + 1);

      const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
      const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const monthRevenue = orders
        .filter((order) => order.createAt >= startOfMonth && order.createAt <= endOfMonth)
        .reduce((acc, order) => acc + Number(order.totalPrice), 0);

      return {
        month: `${startOfMonth.getFullYear()}-${startOfMonth.getMonth() + 1}`,
        revenue: monthRevenue
      };
    });
  }
}
function PercentageChange(currentValue: number, previousValue: number): number {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : -100;
  }
  return ((currentValue - previousValue) / previousValue) * 100;
}

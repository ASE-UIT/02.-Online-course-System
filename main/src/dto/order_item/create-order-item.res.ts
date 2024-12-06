import { Expose, Type } from 'class-transformer';
import { OrderItemCourseRes } from '@/dto/course/order-item-course.res';

export class CreateOrderItemRes {
  @Expose()
  id!: string;

  @Expose()
  price!: number;

  @Expose()
  courseId!: string;

  @Expose()
  @Type(() => OrderItemCourseRes)
  course!: OrderItemCourseRes;
}

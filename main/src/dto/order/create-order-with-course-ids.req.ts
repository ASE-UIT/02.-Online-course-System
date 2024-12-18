import { CreateOrderReq } from '@/dto/order/create-order.req';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderWithCourseIdsReq extends CreateOrderReq {
  @IsNotEmpty()
  courseIds!: string[];
}

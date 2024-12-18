import { Expose, Type } from 'class-transformer';
import { CreatePaymentRes } from '@/dto/payment/create-payment.res';
import { CreateOrderItemRes } from '@/dto/order_item/create-order-item.res';

export class CreateOrderRes {
  @Expose()
  id!: string;

  @Expose()
  totalPrice!: number;

  @Expose()
  paymentId?: string;

  @Expose()
  @Type(() => CreatePaymentRes)
  payment?: CreatePaymentRes;

  @Expose()
  @Type(() => CreateOrderItemRes)
  items!: CreateOrderItemRes[];

  @Expose()
  studentId!: string;

  @Expose()
  status!: string;
}

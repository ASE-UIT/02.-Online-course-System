import { Expose } from 'class-transformer';

export class CreatePaymentRes {
  @Expose()
  id!: string;

  @Expose()
  payType!: string;

  @Expose()
  paymentStatus!: boolean;

  @Expose()
  amount!: number;

  @Expose()
  payInfo?: any;
}

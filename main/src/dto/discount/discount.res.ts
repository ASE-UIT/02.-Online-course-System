import { Expose } from 'class-transformer';
import { BaseRes } from '../base.res';

export class DiscountRes extends BaseRes {
  @Expose()
  id!: string;
  @Expose()
  code!: string;
  @Expose()
  discountAmount!: number;
  @Expose()
  discountPercentage!: number;
  @Expose()
  startDate!: Date;
  @Expose()
  endDate!: Date;
}

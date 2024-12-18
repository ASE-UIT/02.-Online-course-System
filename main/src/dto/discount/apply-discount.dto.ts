import { IsNotEmpty, IsString } from 'class-validator';

export class ApplyDiscountDto {
  @IsNotEmpty()
  @IsString()
  courseId!: string;

  @IsNotEmpty()
  @IsString()
  discountCode!: string;
}

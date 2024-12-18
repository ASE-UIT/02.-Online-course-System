import { IsDateString, IsDecimal, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDiscountReq {
  @IsString()
  @MaxLength(150)
  code!: string;

  @IsDecimal()
  discountAmount!: number;

  @IsDecimal()
  discountPercentage!: number;

  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;

  @IsNotEmpty()
  courseId!: string;
}

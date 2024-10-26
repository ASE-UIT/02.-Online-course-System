import { IsDateString, IsDecimal, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDiscountReq {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  code!: string;

  @IsOptional()
  @IsDecimal()
  discountAmount!: number;

  @IsOptional()
  @IsDecimal()
  discountPercentage!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @IsOptional()
  @IsDateString()
  endDate!: Date;
}

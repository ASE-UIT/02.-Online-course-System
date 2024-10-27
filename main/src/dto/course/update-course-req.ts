import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { IsOptional, IsString, IsNumber, IsEnum, IsUUID, IsDate, Validate } from 'class-validator';
import { DecimalPrecision } from './decimal-10-1-custom';

export class UpdateCourseRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  @Validate(DecimalPrecision, [10, 1])
  duration?: number;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel = DifficultyLevel.easy;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  lecturerId?: string;

  @IsOptional()
  @IsUUID()
  discountId?: string;
}

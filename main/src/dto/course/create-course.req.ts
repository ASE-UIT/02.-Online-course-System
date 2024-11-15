import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  Validate,
  IsDateString
} from 'class-validator';
import { DecimalPrecision } from './decimal-10-1-custom';
import { CreateLessonRequest } from '@/dto/lessons/create-lesson.req';

export class CreateCourseRequest {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsNotEmpty()
  categoryId!: string;
}

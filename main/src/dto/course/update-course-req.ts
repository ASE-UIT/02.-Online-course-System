import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  IsDate,
  IsOptional,
  ValidateNested,
  IsISO8601
} from 'class-validator';
import { DecimalPrecision } from './decimal-10-1-custom';
import { UpdateLessonPartReq } from '@/dto/lesson_part/update-lesson-part.req';
import { Type } from 'class-transformer';

export class UpdateCourseRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsOptional()
  @IsNumber()
  sellPrice?: number;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficultyLevel?: DifficultyLevel;

  @IsOptional()
  @IsISO8601()
  startDate?: Date;

  @IsOptional()
  @IsISO8601()
  endDate?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @Type(() => UpdateLessonPartReq)
  @ValidateNested({ each: true })
  lessonParts?: UpdateLessonPartReq[];
}

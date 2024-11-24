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
  IsISO8601,
  IsBoolean
} from 'class-validator';
import { DecimalPrecision } from './decimal-10-1-custom';
import { UpdateLessonPartReq } from '@/dto/lesson_part/update-lesson-part.req';
import { Type } from 'class-transformer';
import { CourseStatus } from '@/enums/course-status.enum';

export class UpdateCourseRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  introduction?: string;

  @IsOptional()
  @IsString()
  participants?: string;

  @IsOptional()
  courseTargets?: string[];

  @IsOptional()
  @IsString()
  welcomeJoin?: string;

  @IsOptional()
  @IsString()
  videoSale?: string;

  @IsOptional()
  courseMaterials?: string[];

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
  @IsNumber()
  lowestPrice?: number;

  @IsOptional()
  @IsString()
  socialGroupLink?: string;

  @IsOptional()
  @IsString()
  courseLink?: string;

  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  isFreeCourse?: boolean;

  @IsOptional()
  @IsISO8601()
  startFreeDate?: Date;

  @IsOptional()
  @IsISO8601()
  endFreeDate?: Date;

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: boolean;

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

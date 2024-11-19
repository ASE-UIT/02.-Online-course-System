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
  //Tên khóa học
  @IsNotEmpty()
  @IsString()
  name!: string;

  //Mô tả ngắn
  @IsOptional()
  @IsString()
  shortDescription?: string;

  //Giới thiệu
  @IsOptional()
  @IsString()
  introduction?: string;

  //Ảnh khoá học
  @IsOptional()
  @IsString()
  thumbnail?: string;

  //Đối tượng tham gia
  @IsOptional()
  @IsString()
  participants?: string;

  //Mã danh mục khóa học
  @IsNotEmpty()
  categoryId!: string;
}

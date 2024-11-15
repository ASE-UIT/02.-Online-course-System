import { UpdateLessonRequest } from '@/dto/lessons/update-lesson.req';
import { UpdateQuizzReq } from '@/dto/quizz/update-quizz.req';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min, Validate, ValidateNested } from 'class-validator';

export class UpdateLessonPartReq {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  partNo!: number;

  @IsNotEmpty()
  @IsString()
  partName!: string;

  @IsNotEmpty()
  @Type(() => UpdateLessonRequest)
  @ValidateNested({ each: true })
  lessons!: UpdateLessonRequest[];

  @IsNotEmpty()
  @Type(() => UpdateQuizzReq)
  @ValidateNested({ each: true })
  quizzes!: UpdateQuizzReq[];
}

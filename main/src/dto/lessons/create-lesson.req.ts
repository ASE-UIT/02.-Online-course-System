import { CreateQuizzReq } from '@/dto/quizz/create-quizz.req';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonRequest {
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  duration!: number;

  @IsNotEmpty()
  order!: number;

  @IsOptional()
  videoUrl?: string;

  @IsOptional()
  resourceLink?: string[];
}

import { CreateQuizzReq } from '@/dto/quizz/create-quizz.req';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateLessonRequest {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  order!: number;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  duration!: number;

  @IsOptional()
  videoUrl?: string;

  @IsOptional()
  resourceLink?: string[];

  @IsOptional()
  @IsBoolean()
  isFreeTrial?: boolean;

  @IsOptional()
  @IsString()
  introduction?: string;
}

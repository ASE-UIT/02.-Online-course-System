import { QuizChoiceEnum } from '@/enums/quiz-choice.enum';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateQuizzReq {
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  order!: number;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsString()
  choiceA?: string;

  @IsOptional()
  @IsString()
  choiceB?: string;

  @IsOptional()
  @IsString()
  choiceC?: string;

  @IsOptional()
  @IsString()
  choiceD?: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  correctChoices!: string[];
}

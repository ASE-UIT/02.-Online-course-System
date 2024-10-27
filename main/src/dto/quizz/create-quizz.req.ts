import { QuizChoiceEnum } from '@/enums/quiz-choice.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizzReq {
  @IsNotEmpty()
  @IsString()
  content!: string;
  @IsNotEmpty()
  @IsString()
  choiceA!: string;
  @IsNotEmpty()
  @IsString()
  choiceB!: string;
  @IsNotEmpty()
  @IsString()
  choiceC!: string;
  @IsNotEmpty()
  @IsString()
  choiceD!: string;

  @IsEnum(QuizChoiceEnum)
  @IsNotEmpty()
  correctChoice!: string;
}

import { IsNotEmpty } from 'class-validator';

export class AnswerQuizzReq {
  @IsNotEmpty()
  quizId!: string;
  @IsNotEmpty()
  choices!: string[];
}

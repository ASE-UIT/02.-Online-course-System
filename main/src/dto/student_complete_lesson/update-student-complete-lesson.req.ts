import { IsNotEmpty } from 'class-validator';

export class UpdateStudentCompleteLessonReq {
  @IsNotEmpty()
  lessonId!: string;
  @IsNotEmpty()
  progress!: number;
}

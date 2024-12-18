import { IsInt, IsOptional, IsString, IsUUID, Min, Max } from 'class-validator';

export class CreateCourseRatingReq {
  @IsUUID()
  courseId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  ratingPoint!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

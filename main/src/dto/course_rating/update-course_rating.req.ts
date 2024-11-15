import { IsInt, IsOptional, IsString, IsUUID, Min, Max } from 'class-validator';

export class UpdateCourseRatingReq {
  @IsUUID()
  id!: string

  @IsUUID()
  courseId!: string;

  @IsUUID()
  studentId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  ratingPoint!: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsInt()
  liked?: number;

  @IsOptional()
  @IsInt()
  unliked?: number;
}

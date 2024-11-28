import { Expose } from 'class-transformer';

export class LecturerGetCourseRes {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  thumbnail?: string;

  @Expose()
  sellPrice!: number;

  @Expose()
  status!: string;

  @Expose()
  totalStudents!: number;

  @Expose()
  totalReviews!: number;

  @Expose()
  averageRating!: number;
}

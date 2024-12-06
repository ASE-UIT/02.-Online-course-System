import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { CourseStatus } from '@/enums/course-status.enum';
import { CourseCategory } from '@/models/course_category.model';
import { Lecturer } from '@/models/lecturer.model';
import { Discount } from '@/models/discount.model';
import { LessonPart } from '@/models/lesson_part.model';
import { Expose } from 'class-transformer';

export class OrderItemCourseRes {
  @Expose()
  id!: string;

  @Expose()
  name?: string;

  @Expose()
  nameEn?: string;

  @Expose()
  shortDescription?: string;

  @Expose()
  introduction?: string;

  @Expose()
  participants?: string;

  @Expose()
  courseTargets?: string[];

  @Expose()
  welcomeJoin?: string;

  @Expose()
  videoSale?: string;

  @Expose()
  courseMaterials?: string[];

  @Expose()
  thumbnail?: string;

  @Expose()
  originalPrice!: number;

  @Expose()
  sellPrice!: number;

  @Expose()
  lowestPrice?: number;

  @Expose()
  socialGroupLink?: string;

  @Expose()
  courseLink?: string;

  @Expose()
  tags?: string[];

  @Expose()
  duration!: number;

  @Expose()
  difficultyLevel?: string;

  @Expose()
  isFreeCourse!: boolean;

  @Expose()
  startFreeDate?: Date;

  @Expose()
  endFreeDate?: Date;

  @Expose()
  startDate?: Date;

  @Expose()
  endDate?: Date;

  @Expose()
  isApproved!: boolean;

  @Expose()
  status!: string;

  @Expose()
  totalStudents!: number;

  @Expose()
  totalReviews!: number;

  @Expose()
  averageRating!: number;

  @Expose()
  categoryId!: string;

  @Expose()
  lecturerId!: string;
}

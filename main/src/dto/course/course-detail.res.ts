import { LecturerStatsDto } from '@/dto/lecturer/lecturer-stats.dto';
import { Course } from '@/models/course.model';

export class CourseDetailRes extends Course {
  lecturerStats!: LecturerStatsDto;
}

import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';
import { Course } from '@/models/course.model';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';
import { CourseDetailRes } from '@/dto/course/course-detail.res';
import { CourseLearningRes } from '@/dto/course/course-learning.res';
import { GetLearningProgressRes } from '@/dto/student_complete_lesson/get-learning-progress.res';

export interface ICourseService<T extends BaseModelType> extends IBaseCrudService<T> {
  getCourseLearning(
    courseId: string,
    studentId: string,
    learningProgress: GetLearningProgressRes
  ): Promise<CourseLearningRes>;
  lecturerCreateCourse(data: CreateCourseRequest, lecturerId: string): Promise<Course>;
  update(id: string, data: UpdateCourseRequest): Promise<Course>;
  getClosetLiveCourse(amount: number): Promise<Course[]>;
  search(filters: CourseSearchFilterReq[], sort: CourseSearchSortReq, rpp: number, page: number): Promise<Course[]>;
  getCourseDetail(courseId: string): Promise<CourseDetailRes>;
}

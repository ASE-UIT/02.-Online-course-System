import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Lecturer } from '@/models/lecturer.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface INotificationService<T extends BaseModelType> extends IBaseCrudService<T> {
  sendWhenHaveCourseApproveResult(lecturerId: string, course: Course, approved: boolean): Promise<void>;
  sendWhenHaveNewCourseRating(lecturerId: string, courseRating: CourseRating): Promise<void>;
  sendWhenCompleteCourse(studentId: string, course: Course): Promise<void>;
  sendWhenHaveLecturerRegisterApproveResult(lecturerId: string, approved: boolean): Promise<void>;
  sendWhenHaveNewLecturerRegister(lecturer: Lecturer): Promise<void>;
  sendWhenHaveNewCourseRequest(course: Course): Promise<void>;
}

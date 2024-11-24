import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Course } from '@/models/course.model';
import { CourseCategory } from '@/models/course_category.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseCategoryRepository } from '@/repository/interface/i.course_category';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseService } from '@/service/interface/i.course.service';
import { inject, injectable, id } from 'inversify';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import BaseError from '@/utils/error/base.error';
import { IsNull, Not } from 'typeorm';
import { courseRepository } from '@/container/course.container';
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';
import { LessonPart } from '@/models/lesson_part.model';

@injectable()
export class CourseService extends BaseCrudService<Course> implements ICourseService<Course> {
  private courseRepository: ICourseRepository<Course>;
  private courseCategoryRepository: ICourseCategoryRepository<CourseCategory>;

  constructor(
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('CourseCategoryRepository') courseCategoryRepository: ICourseCategoryRepository<CourseCategory>
  ) {
    super(courseRepository);
    this.courseRepository = courseRepository;
    this.courseCategoryRepository = courseCategoryRepository;
  }

  /**
   * * Get course detail
   * @mhhung0811 do this task
   * @param courseId
   */
  async getCourseDetail(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      filter: { id: courseId },
      relations: ['category', 'lecturer', 'lessonParts', 'discount']
    });

    if (!course) {
      throw new BaseError('COURSE_NOT_FOUND', 'Không tìm thấy khóa học');
    }

    return course;
  }

  /**
   * * Lecturer create course, and then waiting for approve from employee
   * Course này cũng bao gồm cả lession và quizz (nếu có)
   * @param body //data của course
   * @param lecturerId //id của giảng viên tạo course
   */
  async lecturerCreateCourse(data: CreateCourseRequest, lecturerId: string): Promise<Course> {
    const category = await this.courseCategoryRepository.findOne({ filter: { id: data.categoryId } });

    if (!category) {
      throw new BaseError('CATEGORY_NOT_FOUND', 'Không tìm thấy danh mục khóa học');
    }

    let course = new Course();
    course = data as unknown as Course;
    course.lecturerId = lecturerId;
    course.createBy = lecturerId;

    // Gọi hàm create từ IBaseRepository để tạo mới khóa học
    return await this.courseRepository.create({ data: course });
  }

  async update(id: string, data: UpdateCourseRequest): Promise<Course> {
    const existingCourse = await this.courseRepository.findOne({
      filter: { id },
      relations: ['lessonParts']
    });

    console.log('existingCourse', JSON.stringify(existingCourse));

    if (!existingCourse) {
      throw new Error('Course not found'); // Thông báo lỗi nếu không tìm thấy khóa học
    }

    // Cập nhật các thuộc tính của khóa học
    const updatedData = { ...existingCourse, ...data }; // Gộp dữ liệu cũ với dữ liệu mới

    // for (const lessonPart of updatedData.lessonParts) {
    //   (lessonPart as unknown as LessonPart).courseId = id;
    // }

    console.log('updatedData', JSON.stringify(updatedData));

    // Gọi hàm findOneAndUpdate từ IBaseRepository để cập nhật khóa học
    const updatedResult = await this.courseRepository.save(updatedData as Course);

    // Trả về thông tin khóa học đã cập nhật dưới dạng DTO
    return updatedResult;
  }

  async getClosetLiveCourse(amount: number): Promise<Course[]> {
    if (amount < 0) throw new Error('Courses amount should be positive');

    return this.courseRepository.findClosetLiveCourse(amount);
  }

  search(filters: CourseSearchFilterReq[], sort: CourseSearchSortReq, rpp: number, page: number): Promise<Course[]> {
    return this.courseRepository.search(filters, sort, rpp, page);
  }
}

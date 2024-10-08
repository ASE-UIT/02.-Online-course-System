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
import {} from 'typeorm'

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
  async update(id:string, data: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    const existingCourse = await this.courseRepository.findOne({ filter: { id } });
    
    if (!existingCourse) {
        throw new Error('Course not found'); // Thông báo lỗi nếu không tìm thấy khóa học
    }

    // Cập nhật các thuộc tính của khóa học
    const updatedData = { ...existingCourse, ...data }; // Gộp dữ liệu cũ với dữ liệu mới

    // Gọi hàm findOneAndUpdate từ IBaseRepository để cập nhật khóa học
    await this.courseRepository.findOneAndUpdate({
        filter: { id },
        updateData: updatedData
    });

    // Trả về thông tin khóa học đã cập nhật dưới dạng DTO
    return convertToDto(UpdateCourseResponse, updatedData);
  }
}
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseRatingSortReq } from '@/dto/course_rating/course_rating-sort.req';
import { CreateCourseRatingReq } from '@/dto/course_rating/create-course_rating.req';
import { UpdateCourseRatingReq } from '@/dto/course_rating/update-course_rating.req';
import { UpdateCourseRatingRes } from '@/dto/course_rating/update-course_rating.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { Course } from '@/models/course.model';
import { CourseRating } from '@/models/course_rating.model';
import { Student } from '@/models/student.model';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { ICourseRatingRepository } from '@/repository/interface/i.course_rating.repository';
import { IStudentRepository } from '@/repository/interface/i.student.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICourseRatingService } from '@/service/interface/i.course_rating.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class CourseRatingService extends BaseCrudService<CourseRating> implements ICourseRatingService<CourseRating> {
  private courseRatingRepository: ICourseRatingRepository<CourseRating>;
  private courseRepository: ICourseRepository<Course>;
  private studentRepository: IStudentRepository<Student>;

  constructor(
    @inject('CourseRatingRepository') courseRatingRepository: ICourseRatingRepository<CourseRating>,
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('StudentRepository') studentRepository: IStudentRepository<Student>
  ) {
    super(courseRatingRepository);
    this.courseRatingRepository = courseRatingRepository;
    this.courseRepository = courseRepository;
    this.studentRepository = studentRepository;
  }

  async createrating(data: CreateCourseRatingReq, studentId: string) {
    const course = await this.courseRepository.findOne({ filter: { id: data.courseId } });
    if (!course) {
      throw new BaseError('COURSE_NOT_FOUND', 'Không tìm thấy khóa học');
    }
    let rating = new CourseRating();
    rating = data as unknown as CourseRating;
    rating.studentId = studentId;
    return await this.courseRatingRepository.create({ data: rating });
  }
  async update(id: string, data: UpdateCourseRatingReq): Promise<UpdateCourseRatingRes> {
    const existingRating = await this.courseRepository.findOne({ filter: { id } });

    if (!existingRating) {
      throw new Error('Rating not found');
    }

    const updatedData = { ...existingRating, ...data };

    await this.courseRepository.findOneAndUpdate({
      filter: { id },
      updateData: updatedData
    });

    return convertToDto(UpdateCourseRatingRes, updatedData);
  }
  search(sort: CourseRatingSortReq, rpp: number, page: number): Promise<CourseRating[]> {
    return this.courseRatingRepository.search(sort, rpp, page);
  }


  async getRatingStatistics(courseId: string) {
    const ratings = await this.courseRatingRepository.findMany({
      filter: { courseId },
    });

    if (!ratings || ratings.length === 0) {
      throw new BaseError(ErrorCode.NOT_FOUND, 'Khóa học chưa có đánh giá');
    }

    // Tính điểm trung bình
    const totalPoints = ratings.reduce((sum, rating) => sum + (rating.ratingPoint || 0), 0);
    const averageRating = totalPoints / ratings.length;

    // Tính phần trăm các mức sao
    const ratingCounts = [0, 0, 0, 0, 0]; // Tương ứng với các sao từ 1 đến 5
    ratings.forEach(rating => {
      if (rating.ratingPoint) {
        ratingCounts[rating.ratingPoint - 1]++;
      }
    });

    const percentageRating = ratingCounts.map(count => (count / ratings.length) * 100);

    return {
      averageRating,
      ratingDistribution: percentageRating,
    };
  }
}

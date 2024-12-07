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
import { ILecturerRepository } from '@/repository/interface/i.lecturer.repository';
import { Lecturer } from '@/models/lecturer.model';
import { LecturerStatsDto } from '@/dto/lecturer/lecturer-stats.dto';
import { CourseDetailRes } from '@/dto/course/course-detail.res';
import redis from '@/utils/redis/redis.util';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import { TIME_CONSTANTS } from '@/constants/time.constants';
import { CourseLearningRes } from '@/dto/course/course-learning.res';
import { IStudentCompleteQuizRepository } from '@/repository/interface/i.student_complete_quiz.repository';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { GetLearningProgressRes } from '@/dto/student_complete_lesson/get-learning-progress.res';

@injectable()
export class CourseService extends BaseCrudService<Course> implements ICourseService<Course> {
  private courseRepository: ICourseRepository<Course>;
  private courseCategoryRepository: ICourseCategoryRepository<CourseCategory>;
  private lecturerRepository: ILecturerRepository<Lecturer>;
  private studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>;

  constructor(
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('LecturerRepository') lecturerRepository: ILecturerRepository<Lecturer>,
    @inject('StudentCompleteQuizRepository')
    studentCompleteQuizRepository: IStudentCompleteQuizRepository<StudentCompleteQuiz>,
    @inject('CourseCategoryRepository') courseCategoryRepository: ICourseCategoryRepository<CourseCategory>
  ) {
    super(courseRepository);
    this.courseRepository = courseRepository;
    this.courseCategoryRepository = courseCategoryRepository;
    this.lecturerRepository = lecturerRepository;
    this.studentCompleteQuizRepository = studentCompleteQuizRepository;
  }

  /**
   * This method is diffrent from get course detail by id
   * because => its return course detail with learning progress of each lesson and also
   * quiz progress of each quiz
   * @param courseId
   */
  async getCourseLearning(
    courseId: string,
    studentId: string,
    learningProgress: GetLearningProgressRes
  ): Promise<CourseLearningRes> {
    let courseDetail: Course;
    //Check in cache
    const courseDetailCache = await redis.get(`${RedisSchemaEnum.courseDetail}:${courseId}`);
    if (courseDetailCache) {
      courseDetail = JSON.parse(courseDetailCache) as Course;
    } else {
      const courseDetailInDb = await this.courseRepository.getCourseDetail(courseId);

      if (!courseDetailInDb) {
        throw new BaseError('COURSE_NOT_FOUND', 'Không tìm thấy khóa học');
      }

      courseDetail = courseDetailInDb as Course;
    }

    let courseLearningRes = new CourseLearningRes();

    courseLearningRes = courseDetail as unknown as CourseLearningRes;

    for (const lessonPart of courseLearningRes.lessonParts) {
      for (const lesson of lessonPart.lessons) {
        //Check if lesson is complete from learning progress
        const isCompleteLesson = learningProgress.lessonLearnProgresses.find((x) => x.lessonId === lesson.id);
        if (isCompleteLesson) {
          lesson.isComplete = isCompleteLesson.isComplete;
          lesson.progress = isCompleteLesson.progress;
          lesson.completeAt = isCompleteLesson.completeAt;
        } else {
          lesson.isComplete = false;
          lesson.progress = 0;
        }
      }

      for (const quiz of lessonPart.quizzes) {
        const isCompleteQuiz = await this.studentCompleteQuizRepository.findOne({
          filter: { studentId, quizId: quiz.id }
        });

        if (isCompleteQuiz) {
          quiz.isComplete = true;
        } else {
          quiz.isComplete = false;
        }
      }
    }

    courseLearningRes.learningProgress = {
      totalCompleteLesson: learningProgress.totalCompleteLesson,
      totalLesson: learningProgress.totalLesson,
      courseProgress: learningProgress.courseProgress
    };

    return courseLearningRes;
  }

  /**
   * * Get course detail
   * @mhhung0811 do this task
   * @param courseId
   */
  async getCourseDetail(courseId: string): Promise<CourseDetailRes> {
    //Check in cache
    const courseDetailCache = await redis.get(`${RedisSchemaEnum.courseDetail}:${courseId}`);
    if (courseDetailCache) {
      const parsedCourseDetail = JSON.parse(courseDetailCache) as CourseDetailRes;
      const lecturerStats: LecturerStatsDto = await this.lecturerRepository.getLecturerStats(
        parsedCourseDetail.lecturerId
      );

      parsedCourseDetail.lecturerStats = lecturerStats;

      return parsedCourseDetail;
    }

    const course = await this.courseRepository.getCourseDetail(courseId);

    if (!course) {
      throw new BaseError('COURSE_NOT_FOUND', 'Không tìm thấy khóa học');
    }

    //Caching course detail
    redis.set(
      `${RedisSchemaEnum.courseDetail}:${courseId}`,
      JSON.stringify(course),
      'EX',
      (TIME_CONSTANTS.MINUTE / 1000) * 30 //30 minutes
    );

    //Calculate lecturer stat: average rating, total rating, total student, total course
    const lecturerStats: LecturerStatsDto = await this.lecturerRepository.getLecturerStats(course.lecturerId);

    (course as CourseDetailRes).lecturerStats = lecturerStats;

    /**
     * ! Tạm thời comment lại để fe test cho dễ
     */
    //Just show videoUrl to free trial lesson
    // for (const lessonPart of course.lessonParts) {
    //   for (const lesson of lessonPart.lessons) {
    //     if (!lesson.isFreeTrial) {
    //       lesson.videoUrl = undefined;
    //     }
    //   }
    // }

    return course as CourseDetailRes;
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

    //Xóa course detail trong cache
    redis.del(`${RedisSchemaEnum.courseDetail}:${id}`);

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

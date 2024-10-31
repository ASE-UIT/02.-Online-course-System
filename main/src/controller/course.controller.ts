import BaseError from '@/utils/error/base.error';
import { Request, Response, NextFunction } from 'express';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { CourseSelectRes } from '@/dto/course/course-select.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Course } from '@/models/course.model';
import { ICourseService } from '@/service/interface/i.course.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';
import { CreateCourseRequest } from '@/dto/course/create-course.req';
import { CreateCourseResponse } from '@/dto/course/create-course.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { validateRequest } from '@/utils/validate/validate-request.util';
import { ErrorCode } from '@/enums/error-code.enums';
import { UpdateCourseRequest } from '@/dto/course/update-course-req';
import { UpdateCourseResponse } from '@/dto/course/update-course.res';
import { SessionUtil } from '@/utils/session.util';
import { CourseDetailSelectRes } from '@/dto/course/course-detail-select.res';
import { CourseSearchFilterReq } from '@/dto/course/course-search-filter.req';
import { CourseSearchSortReq } from '@/dto/course/course-search-sort.req';

@injectable()
export class CourseController {
  public common: IBaseCrudController<Course>;
  private courseService: ICourseService<Course>;
  constructor(
    @inject('CourseService') courseService: ICourseService<Course>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Course>
  ) {
    this.courseService = courseService;
    this.common = common;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lecturer = SessionUtil.getLecturerCurrentlyLoggedIn(req);

      const lecturerId = lecturer.id;

      const result = await this.courseService.lecturerCreateCourse(req.body, lecturerId);

      res.send_created('Tạo mới khóa học thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /course/:id
   */
  async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const courseId = req.params.id;
      const result = await this.courseService.findOneAndUpdate({
        filter: { id: courseId },
        updateData: {
          deleteAt: new Date()
        }
      });
      res.send_ok('Xoá mềm khoá học thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/waiting-for-approve
   */
  async findWaitingForApprove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await this.courseService.findMany({
        filter: {
          isApproved: false
        },
        relations: ['category', 'lecturer'],
        select: CourseSelectRes,
        order: [
          {
            column: 'createAt',
            direction: 'DESC'
          }
        ]
      });
      res.send_ok('Get all courses successfully', courses);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/waiting-for-approve
   */
  async findWaitingForApprovePaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const rpp = parseInt(req.query.rpp as string) || 10;

      const paging = new PagingDto(page, rpp);

      const courses = await this.courseService.findWithPaging({
        filter: {
          isApproved: false
        },
        relations: ['category', 'lecturer'],
        select: CourseSelectRes,
        paging: paging,
        order: [
          {
            column: 'createAt',
            direction: 'DESC'
          }
        ]
      });
      res.send_ok('Get all courses successfully', courses);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course
   * @param req
   * @param res
   * @param next
   */
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await this.courseService.findMany({
        filter: {
          isApproved: true
        },
        relations: ['category', 'lecturer'],
        select: CourseSelectRes
      });
      console.log('courses', courses);
      res.send_ok('Get all courses successfully', courses);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Kiểm tra id trong request params
      if (!req.params.id) throw new BaseError(ErrorCode.NF_01, 'Id là bắt buộc');

      // Validate request body dựa vào DTO (UpdateCourseReq)
      await validateRequest(UpdateCourseRequest, req.body);
      const result = await this.courseService.update(req.params.id, req.body);
      const responseBody = new UpdateCourseResponse(result);
      res.send_ok('Cập nhật khóa học thành công', responseBody);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/paging
   * @param req
   * @param res
   * @param next
   */
  async findAllWithPaging(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const rpp = parseInt(req.query.rpp as string) || 10;

      const paging = new PagingDto(page, rpp);

      const response: PagingResponseDto<Course> = await this.courseService.findWithPaging({
        paging: paging,
        select: CourseSelectRes,
        relations: ['category', 'lecturer'],
        filter: {
          isApproved: true
        }
      });

      res.send_ok('Get all courses successfully', response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /course/approve/:id
   */
  async approveCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courseId = req.params.id;
      const result = await this.courseService.findOneAndUpdate({
        filter: { id: courseId },
        updateData: {
          isApproved: true
        }
      });
      res.send_ok('Duyệt khóa học thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/live/:amount
   */
  async findLive(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const amount = parseInt(req.params.amount) || 1;
      const result = await this.courseService.getClosetLiveCourse(amount);

      res.send_ok(`Get live courses successfully`, result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/:id
   */
  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courseId = req.params.id;
      const course = await this.courseService.findOne({
        filter: { id: courseId },
        relations: ['category', 'lecturer', 'lessons', 'discount'],
        select: CourseDetailSelectRes
      });
      res.send_ok('Get course successfully', course);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /course/search/?filter=&sort=&rpp=&page=
   */
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters: CourseSearchFilterReq[] = JSON.parse(req.query.filter as string);
      const sort: CourseSearchSortReq = JSON.parse(req.query.sort as string);
      const rpp = parseInt(req.query.rpp as string) || 10;
      const page = parseInt(req.query.page as string) || 1;

      const result = await this.courseService.search(filters, sort, rpp, page);

      res.send_ok(`Get search courses successfully`, result);
    } catch (error) {
      next(error);
    }
  }
}

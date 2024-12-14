import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { EmployeeSelectRes } from '@/dto/employee/employee-select.res';
import { EmployeeRes } from '@/dto/employee/employee.res';
import { PagingDto } from '@/dto/paging.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { Employee } from '@/models/employee.model';
import { IEmployeeService } from '@/service/interface/i.employee.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import bcrypt from 'bcrypt';
import { Course } from '@/models/course.model';
import { getRepository } from 'typeorm';
import { UpdateLecturerRes } from '@/dto/employee/update-lecturer.res';

@injectable()
export class EmployeeController {
  public common: IBaseCrudController<Employee>;
  private employeeService: IEmployeeService<Employee>;
  constructor(
    @inject('EmployeeService') employeeService: IEmployeeService<Employee>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Employee>
  ) {
    this.employeeService = employeeService;
    this.common = common;
  }

  /**
   * * POST /employee/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.employeeService.login(data);
      res.send_ok('Login successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /employee/create
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      data.password = bcrypt.hashSync(data.password, 10);

      const result = await this.employeeService.create({
        data: data
      });
      const resultDto = convertToDto(EmployeeRes, result);
      res.send_ok('Create successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /employee
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.employeeService.findMany({
        select: EmployeeSelectRes
      });
      res.send_ok('Get all employees successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /employee/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.employeeService.findOne({
        filter: { id: id }
      });
      const resultDto = convertToDto(EmployeeRes, result);
      res.send_ok('Get employee successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /employee/paging
   */
  async findAllWithPaging(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, rpp } = req.query;
      const paging = new PagingDto(Number(page), Number(rpp));
      const result = await this.employeeService.findAllWithPaging({
        paging,
        select: EmployeeSelectRes
      });
      res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /employee/me
   */
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new BaseError(ErrorCode.AUTH_01, 'Unauthorized');
      }

      const result = await this.employeeService.findOne({
        filter: { id: userId }
      });
      const resultDto = convertToDto(EmployeeRes, result);
      res.send_ok('Get me successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }

  static async approveCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.body;

      const courseRepository = getRepository(Course);
      const course = await courseRepository.findOne(courseId);

      if (!course) {
        return res.status(404).json({ message: 'Không tìm thấy khóa học' });
      }

      course.status = 'Approved';
      await courseRepository.save(course);

      return res.status(200).json({ message: 'Khóa học đã được duyệt thành công', course });
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async addLecturer(req:Request, res:Response, next:NextFunction) {
    try {
      const lecturerData = req.body; // Dữ liệu giảng viên từ body request
      const user = req.user as unknown; 
  

      if(!IsEmployee(user)){
        throw new BaseError(ErrorCode.PERMISSION_01, 'Vui lòng đăng nhập');
      }
      const currentEmployee = user as Employee;
      const result = await this.employeeService.addLecturer(
        currentEmployee,
        lecturerData
      );
  
      res.send_ok('Thêm mới giảng viên thành công', result);
    } catch (error) {
      next(error);
    }

  }

  
  async updateLecturer(req:Request, res:Response, next:NextFunction) {
    try{
      const lecturerData = req.body; // Dữ liệu giảng viên từ body request
    const lecturerId = req.params.id; // Lấy id giảng viên từ params
    const user = req.user as unknown; 
  

      if(!IsEmployee(user)){
        throw new BaseError(ErrorCode.PERMISSION_01, 'Vui lòng đăng nhập');
      }
      const currentEmployee = user as Employee;
    const result= await this.employeeService.updateLecturer(
      currentEmployee,
      lecturerId,
      lecturerData
    )
    res.send_ok('Cập nhật giảng viên thành công', result);
    }
    catch(error){
      next(error);
    }
  }


  async rejectLecturerApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const { lecturerId, reason } = req.body; // Lấy dữ liệu từ body request

      const user = req.user as unknown; 
  

      if(!IsEmployee(user)){
        throw new BaseError(ErrorCode.PERMISSION_01, 'Vui lòng đăng nhập');
      }
      const currentEmployee = user as Employee;
  
      await this.employeeService.rejectLecturerApplication(currentEmployee, lecturerId, reason);
  
      res.send_ok('Đơn giảng viên đã được từ chối và email đã được gửi.');
    } catch (error) {
      next(error);
    }
  }
}

function IsEmployee(user: unknown): user is Employee {
  return (user as Employee).id !== undefined;
}

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
}

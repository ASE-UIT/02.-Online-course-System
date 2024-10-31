import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ChangePasswordReqDto } from '@/dto/lecturer/lecturer-change-password.req';
import { LecturerRes } from '@/dto/lecturer/lecturer.res';
import { LecturerSelect } from '@/dto/lecturer/lecturer.select';
import { ErrorCode } from '@/enums/error-code.enums';
import { Lecturer } from '@/models/lecturer.model';
import { ILecturerService } from '@/service/interface/i.lecturer.service';
import { ITYPES } from '@/types/interface.types';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class LecturerController {
  public common: IBaseCrudController<Lecturer>;
  private lecturerService: ILecturerService<Lecturer>;
  constructor(
    @inject('LecturerService') lecturerService: ILecturerService<Lecturer>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Lecturer>
  ) {
    this.lecturerService = lecturerService;
    this.common = common;
  }

  /**
   * * POST /lecturer/register
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.lecturerService.register(data);
      res.send_ok('Đăng ký thành công, tiếp đến hãy xác thực số điện thoại qua OTP', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /lecturer/activation/phone/?phoneNumber=xxx&code=xxx
   */
  async activatePhoneNumber(
    req: Request<null, null, null, { phoneNumber: string; code: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      let phoneNumber = req.query.phoneNumber;
      const code = req.query.code;

      if (!phoneNumber || !code) {
        res.send_badRequest('Số điện thoại và mã OTP không được để trống');
      }

      phoneNumber = '+' + phoneNumber;

      await this.lecturerService.activatePhoneNumber(phoneNumber, code);
      res.send_ok('Xác thực OTP thành công!');
    } catch (error: any) {
      if (error instanceof BaseError) {
        if (error.code === ErrorCode.PHONE_NUMBER_NOT_FOUND) {
          res.send_notFound('Số điện thoại không tồn tại', error);
        }
        if (error.code === ErrorCode.INVALID_CODE) {
          res.send_badRequest(error.message, error);
        }
        next(error);
      }
    }
  }

  /**
   * * POST /lecturer/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this.lecturerService.login(data);
      res.send_ok('Đăng nhập thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * PUT /lecturer/approve/:id
   */
  async approve(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.lecturerService.findOneAndUpdate({
        filter: { id: id },
        updateData: {
          isApproved: true,
          updateBy: req.user!.id
        }
      });
      res.send_ok('Duyệt giảng viên thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /lecturer/me
   */
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new BaseError(ErrorCode.AUTH_01, 'Unauthorized');
      }

      const result = await this.lecturerService.getDetail(userId);
      res.send_ok('Get me successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /lecturer/:id
   */
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await this.lecturerService.findOne({
        filter: { id: id }
      });
      const resultDto = convertToDto(LecturerRes, result);
      res.send_ok('Get lecturer successfully', resultDto);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /lecturer/paging
   */
  async findAllWithPaging(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, rpp } = req.query;
      const paging = { page: Number(page), rpp: Number(rpp) };
      const result = await this.lecturerService.findAllWithPaging({
        paging,
        select: LecturerSelect
      });
      res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /lecturer
   */
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.lecturerService.findMany({
        select: LecturerSelect
      });
      res.send_ok('Get all lecturers successfully', result);
    } catch (error) {
      next(error);
    }
  }


  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body as ChangePasswordReqDto;
      const lecturerId = req.user.id; // Sử dụng ID của giảng viên đã đăng nhập từ `req.user`

      await this.lecturerService.changePassword(lecturerId, currentPassword, newPassword);
      res.send_ok('Đổi mật khẩu thành công');
    } catch (error) {
      next(error);
    }
  }
}

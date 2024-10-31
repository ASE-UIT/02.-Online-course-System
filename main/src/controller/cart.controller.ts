import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ErrorCode } from '@/enums/error-code.enums';
import { Cart } from '@/models/cart.model';
import { ICartService } from '@/service/interface/i.cart.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class CartController {
  public common: IBaseCrudController<Cart>;
  private cartService: ICartService<Cart>;
  constructor(
    @inject('CartService') cartService: ICartService<Cart>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Cart>
  ) {
    this.cartService = cartService;
    this.common = common;
  }

  /**
   * * GET /cart/me
   */
  async getMyCart(req: Request, res: Response, next: NextFunction) {
    try {
      const student = req.user;

      if (!student) {
        throw new BaseError(ErrorCode.AUTH_01, 'Học viên chưa đăng nhập');
      }

      const studentId = student.id;

      const result = await this.cartService.findOne({
        filter: {
          studentId: studentId
        }
      });

      res.send_ok('Lấy giỏ hàng thành công', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /cart/add
   */
  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const student = req.user;
      const data = req.body;

      if (!student) {
        throw new BaseError(ErrorCode.AUTH_01, 'Học viên chưa đăng nhập');
      }

      const studentId = student.id;

      await this.cartService.addToCart(studentId, data);

      res.send_ok('Thêm vào giỏ hàng thành công');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * DELETE /cart/remove/:courseId
   */
  async removeFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const student = req.user;
      const courseId = req.params.courseId;

      console.log('Course id', courseId);

      if (!student) {
        throw new BaseError(ErrorCode.AUTH_01, 'Học viên chưa đăng nhập');
      }

      const studentId = student.id;

      await this.cartService.removeFromCart(studentId, courseId);

      res.send_ok('Xóa khóa học khỏi giỏ hàng thành công');
    } catch (error) {
      next(error);
    }
  }
}

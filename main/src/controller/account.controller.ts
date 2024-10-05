import { inject, injectable } from 'inversify';
import { ITYPES } from '@/types/interface.types';
import { IAccountService } from '@/service/interface/i.account.service';
import { Account } from '@/models/account.model';
import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { NextFunction, Request, Response } from 'express';
import { CreateAccountReq } from '@/dto/account/create-account.req';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';
import { validateRequest } from '@/utils/validate/validate-request.util';
import { CreateAccountRes } from '@/dto/account/create-account.res';

@injectable()
export class AccountController {
  public common: IBaseCrudController<Account>;
  private accountService: IAccountService<Account>;
  constructor(
    @inject('AccountService') accountService: IAccountService<Account>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.accountService = accountService;
    this.common = common;
  }

  /**
   * * POST /api/account
   * @param req
   * @param res
   * @param next
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: CreateAccountReq = req.body;

      const result = await this.accountService.create({
        data: requestBody
      });
      const responseBody = convertToDto(CreateAccountRes, result);
      res.send_ok('Create new account successful', responseBody);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/account
   * @param req
   * @param res
   * @param next
   */
  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.params.id) throw new BaseError(ErrorCode.NF_01, 'Id is required');
      const id = req.params.id;
      const result = await this.accountService.findOne({
        filter: { id: id },
        relations: ['role']
      });
      res.send_ok('Found successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /api/account/register
   */
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: CreateAccountReq = req.body;
      const result = await this.accountService.register(requestBody);
      res.send_ok('Register successful', result);
    } catch (error) {
      next(error);
    }
  }
}

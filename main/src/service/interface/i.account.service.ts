import { RegisterAccountReq } from '@/dto/account/register-account.req';
import { RegisterAccountRes } from '@/dto/account/register-account.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IAccountService<T extends BaseModelType> extends IBaseCrudService<T> {
  register(data: RegisterAccountReq): Promise<RegisterAccountRes>;
}

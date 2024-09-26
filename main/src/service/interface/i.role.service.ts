import { CreateRoleWithAccountReq } from '@/dto/role/create-role-with-account.req';
import { CreateRoleWithAccountRes } from '@/dto/role/create-role-with-account.res';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IRoleService<T extends BaseModelType> extends IBaseCrudService<T> {}

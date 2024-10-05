import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICartService<T extends BaseModelType> extends IBaseCrudService<T> {}

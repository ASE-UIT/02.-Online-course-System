import { CreateOrderReq } from '@/dto/order/create-order.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IOrderService<T extends BaseModelType> extends IBaseCrudService<T> {
  createOrder(createOrderReq: CreateOrderReq, studentId: string): Promise<void>;
}

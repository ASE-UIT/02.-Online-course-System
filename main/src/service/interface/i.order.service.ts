import { CreateOrderReq } from '@/dto/order/create-order.req';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search-data.dto';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IOrderService<T extends BaseModelType> extends IBaseCrudService<T> {
  getMyOrders(studentId: string, searchData: SearchDataDto): Promise<PagingResponseDto<T>>;
  createOrder(createOrderReq: CreateOrderReq, studentId: string): Promise<T>;
}

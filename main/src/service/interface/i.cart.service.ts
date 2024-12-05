import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface ICartService<T extends BaseModelType> extends IBaseCrudService<T> {
  getMyCart(studentId: string): Promise<T>;
  addToCart(studentId: string, data: AddToCartReq): Promise<void>;
  removeFromCart(studentId: string, courseId: string): Promise<void>;
}

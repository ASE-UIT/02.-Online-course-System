import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Cart } from '@/models/cart.model';
import { ICartService } from '@/service/interface/i.cart.service';
import { ITYPES } from '@/types/interface.types';
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
}

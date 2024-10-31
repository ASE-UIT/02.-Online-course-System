import { AddToCartReq } from '@/dto/cart/add-to-cart.req';
import { ErrorCode } from '@/enums/error-code.enums';
import { Cart } from '@/models/cart.model';
import { CartItem } from '@/models/cart_item.model';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { ICartService } from '@/service/interface/i.cart.service';
import BaseError from '@/utils/error/base.error';
import { inject, injectable } from 'inversify';

@injectable()
export class CartService extends BaseCrudService<Cart> implements ICartService<Cart> {
  private cartRepository: ICartRepository<Cart>;
  private cartItemRepository: ICartItemRepository<CartItem>;

  constructor(
    @inject('CartRepository') cartRepository: ICartRepository<Cart>,
    @inject('CartItemRepository') cartItemRepository: ICartItemRepository<CartItem>
  ) {
    super(cartRepository);
    this.cartRepository = cartRepository;
    this.cartItemRepository = cartItemRepository;
  }

  /**
   * * Remove cart item from cart
   * @param studentId
   * @param courseId
   */
  async removeFromCart(studentId: string, courseId: string): Promise<void> {
    const cart = await this.cartRepository.findOne({
      filter: {
        studentId: studentId
      }
    });

    if (!cart) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Giỏ hàng không tồn tại');
    }

    await this.cartItemRepository.findOneAndHardDelete({
      filter: {
        courseId: courseId,
        cartId: cart.id
      }
    });
  }

  /**
   * * Add new course to cart
   * @param studentId
   * @param data
   */
  async addToCart(studentId: string, data: AddToCartReq): Promise<void> {
    const cart = await this.cartRepository.findOne({
      filter: {
        studentId: studentId
      }
    });

    if (!cart) {
      throw new BaseError(ErrorCode.BAD_REQUEST, 'Giỏ hàng không tồn tại');
    }

    const cartItem = new CartItem();
    cartItem.courseId = data.courseId;
    cartItem.cartId = cart.id;

    await this.cartItemRepository.create({
      data: cartItem
    });
  }
}

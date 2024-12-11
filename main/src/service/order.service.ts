import { CreateOrderReq } from '@/dto/order/create-order.req';
import { OrderSelectRes } from '@/dto/order/order-select.res';
import { PagingResponseDto } from '@/dto/paging-response.dto';
import { SearchDataDto } from '@/dto/search-data.dto';
import { ErrorCode } from '@/enums/error-code.enums';
import { Cart } from '@/models/cart.model';
import { CartItem } from '@/models/cart_item.model';
import { Course } from '@/models/course.model';
import { Discount } from '@/models/discount.model';
import { Enrollment } from '@/models/enrollment.model';
import { Order } from '@/models/order.model';
import { OrderItem } from '@/models/order_item.model';
import { Payment } from '@/models/payment.model';
import { ICartRepository } from '@/repository/interface/i.cart.repository';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IOrderService } from '@/service/interface/i.order.service';
import BaseError from '@/utils/error/base.error';
import { SearchUtil } from '@/utils/search.util';
import { inject, injectable } from 'inversify';

@injectable()
export class OrderService extends BaseCrudService<Order> implements IOrderService<Order> {
  private orderRepository: IOrderRepository<Order>;
  private cartRepository: ICartRepository<Cart>;
  private discountRepository: IDiscountRepository<Discount>;
  private enrollRepository: IEnrollmentRepository<Enrollment>;

  constructor(
    @inject('OrderRepository') orderRepository: IOrderRepository<Order>,
    @inject('CartRepository') cartRepository: ICartRepository<Cart>,
    @inject('EnrollmentRepository') enrollRepository: IEnrollmentRepository<Enrollment>,
    @inject('DiscountRepository') discountRepository: IDiscountRepository<Discount>
  ) {
    super(orderRepository);
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.discountRepository = discountRepository;
    this.enrollRepository = enrollRepository;
  }

  async getMyOrders(studentId: string, searchData: SearchDataDto): Promise<PagingResponseDto<Order>> {
    const { where, order, paging } = SearchUtil.getWhereCondition(searchData);

    where.studentId = studentId;

    const orders = await this.orderRepository.findMany({
      filter: where,
      relations: ['items', 'items.course'],
      select: OrderSelectRes,
      order: order,
      paging: paging
    });

    const total = await this.orderRepository.count({ filter: where });

    return {
      items: orders,
      total: total
    };
  }

  /**
   * Tính tổng tiền của đơn hàng
   *
   * @param cartItems
   * @param createOrderReq
   * @returns
   */
  async calculateTotal(
    cartItems: CartItem[],
    createOrderReq: CreateOrderReq
  ): Promise<{
    total: number;
    priceEachCourse: Map<string, number>;
  }> {
    //Tính tổng tiền
    let total = 0;
    const priceEachCourse = new Map<string, number>();
    cartItems.forEach(async (item) => {
      const courseInCart = item.course;

      //Nếu như có áp mã giảm giá
      if (createOrderReq.applyDiscount) {
        for (const discount of createOrderReq.applyDiscount) {
          if (discount.courseId === courseInCart.id) {
            //Check mã giảm giá có hợp lệ không
            const discountInDb = await this.discountRepository.findOne({
              filter: {
                code: discount.discountCode,
                courseId: discount.courseId
              }
            });

            if (!discountInDb) {
              throw new BaseError(ErrorCode.DISCOUNT_NOT_FOUND, 'Mã giảm giá không tồn tại');
            }

            //Check thời hạn
            if (discountInDb.endDate < new Date()) {
              throw new BaseError(ErrorCode.DISCOUNT_EXPIRED, 'Mã giảm giá đã hết hạn');
            }

            if (discountInDb.startDate > new Date()) {
              throw new BaseError(ErrorCode.DISCOUNT_NOT_STARTED, 'Mã giảm giá chưa bắt đầu được áp dụng');
            }
            let afterDiscount;

            //Tiến hành trừ tiền

            //Nếu như discount có áp dụng luật discountAmount => tức là giảm giá theo số tiền
            if (discountInDb.discountAmount) {
              afterDiscount = courseInCart.sellPrice - discountInDb.discountAmount;

              //Nếu như discount có áp dụng luật lowrestPrice => tức là không được giảm giá dưới giá này
              if (courseInCart.lowestPrice) {
                if (afterDiscount < courseInCart.lowestPrice) {
                  afterDiscount = courseInCart.lowestPrice;
                }
              }

              total += afterDiscount;
              priceEachCourse.set(courseInCart.id, afterDiscount);

              continue;
            }

            //Nếu như discount có áp dụng luật discountPercentage => tức là giảm giá theo %
            if (discountInDb.discountPercentage) {
              afterDiscount = courseInCart.sellPrice - courseInCart.sellPrice * (discountInDb.discountPercentage / 100);
              //Nếu như discount có áp dụng luật lowrestPrice => tức là không được giảm giá dưới giá này
              if (courseInCart.lowestPrice) {
                if (afterDiscount < courseInCart.lowestPrice) {
                  afterDiscount = courseInCart.lowestPrice;
                }
              }

              total += afterDiscount;
              priceEachCourse.set(courseInCart.id, afterDiscount);

              continue;
            }
          }
        }
      }

      total += courseInCart.sellPrice;
    });

    return {
      total,
      priceEachCourse
    };
  }

  async createOrder(createOrderReq: CreateOrderReq, studentId: string): Promise<Order> {
    //Lấy khóa học từ cart
    const cart = await this.cartRepository.findOne({
      filter: {
        studentId: studentId
      }
    });

    if (!cart) {
      throw new BaseError(ErrorCode.CART_NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    const cartItems = cart.items;

    if (!cartItems || cartItems.length === 0) {
      throw new BaseError(ErrorCode.CART_EMPTY, ErrorCode.BAD_REQUEST);
    }

    const calculateTotalResult = await this.calculateTotal(cartItems, createOrderReq);

    const order = new Order();

    order.totalPrice = calculateTotalResult.total;

    const orderItems = new Array<OrderItem>();

    const priceEachCourse = calculateTotalResult.priceEachCourse;

    cartItems.forEach((item) => {
      const orderItem = new OrderItem();
      orderItem.course = item.course;
      orderItem.price = priceEachCourse.get(item.course.id) || item.course.sellPrice;

      orderItems.push(orderItem);
    });

    order.items = orderItems;
    order.studentId = studentId;

    //Create payment
    const payment = new Payment();
    payment.payType = createOrderReq.payType;
    payment.amount = order.totalPrice;

    order.payment = payment;

    await this.orderRepository.save(order);

    //Create enrollment
    for (const item of orderItems) {
      const enrollment = new Enrollment();
      enrollment.courseId = item.course.id;
      enrollment.studentId = studentId;
      enrollment.enrolledDate = new Date();
      enrollment.status = 'active';
      enrollment.completionPercentage = 0;

      await this.enrollRepository.save(enrollment);
    }

    return order;
  }
}

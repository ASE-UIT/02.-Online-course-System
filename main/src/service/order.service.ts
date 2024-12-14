import { CreateOrderWithCourseIdsReq } from '@/dto/order/create-order-with-course-ids.req';
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
import { ICartItemRepository } from '@/repository/interface/i.cart_item.repository';
import { ICourseRepository } from '@/repository/interface/i.course.repository';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IOrderService } from '@/service/interface/i.order.service';
import { sendEmail } from '@/utils/email/email-sender.util';
import BaseError from '@/utils/error/base.error';
import { SearchUtil } from '@/utils/search.util';
import { inject, injectable } from 'inversify';

@injectable()
export class OrderService extends BaseCrudService<Order> implements IOrderService<Order> {
  private orderRepository: IOrderRepository<Order>;
  private cartRepository: ICartRepository<Cart>;
  private discountRepository: IDiscountRepository<Discount>;
  private enrollRepository: IEnrollmentRepository<Enrollment>;
  private courseRepository: ICourseRepository<Course>;
  private cartItemRepository: ICartItemRepository<CartItem>;

  constructor(
    @inject('OrderRepository') orderRepository: IOrderRepository<Order>,
    @inject('CartRepository') cartRepository: ICartRepository<Cart>,
    @inject('EnrollmentRepository') enrollRepository: IEnrollmentRepository<Enrollment>,
    @inject('DiscountRepository') discountRepository: IDiscountRepository<Discount>,
    @inject('CourseRepository') courseRepository: ICourseRepository<Course>,
    @inject('CartItemRepository') cartItemRepository: ICartItemRepository<CartItem>
  ) {
    super(orderRepository);
    this.orderRepository = orderRepository;
    this.cartRepository = cartRepository;
    this.discountRepository = discountRepository;
    this.enrollRepository = enrollRepository;
    this.courseRepository = courseRepository;
    this.cartItemRepository = cartItemRepository;
  }
  async createOrderWithCourseIds(requestBody: CreateOrderWithCourseIdsReq, studentId: string): Promise<Order> {
    //Get course from courseIds
    const courses = [];

    for (const courseId of requestBody.courseIds) {
      const course = await this.courseRepository.findOne({ filter: { id: courseId } });

      if (!course) {
        throw new BaseError(ErrorCode.NOT_FOUND, `Course with id ${courseId} not found`);
      }

      courses.push(course);
    }

    const calculateTotalResult = await this.calculateTotal(courses, requestBody);

    const order = new Order();

    order.totalPrice = calculateTotalResult.total;

    const orderItems = new Array<OrderItem>();

    const priceEachCourse = calculateTotalResult.priceEachCourse;

    courses.forEach((item) => {
      const orderItem = new OrderItem();
      orderItem.course = item;
      orderItem.price = priceEachCourse.get(item.id) || item.sellPrice;

      orderItems.push(orderItem);
    });

    order.items = orderItems;
    order.studentId = studentId;

    //Create payment
    const payment = new Payment();
    payment.payType = requestBody.payType;
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

    //Send success email

    if (requestBody.customerEmail) {
      let content = `Đơn hàng của bạn đã được tạo thành công với tổng giá trị là ${order.totalPrice}`;

      for (const item of orderItems) {
        content += `\nKhóa học: ${item.course.name} - Giá: ${item.price}`;
      }

      sendEmail({
        from: {
          name: 'Eduhub'
        },
        to: { emailAddress: [requestBody.customerEmail] },
        subject: 'Tạo đơn mua khóa học thành công',
        text: content
      });
    }

    return order;
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
   * @param courses
   * @param createOrderReq
   * @returns
   */
  async calculateTotal(
    courses: Course[],
    createOrderReq: CreateOrderReq
  ): Promise<{
    total: number;
    priceEachCourse: Map<string, number>;
  }> {
    //Tính tổng tiền
    let total = 0;
    const priceEachCourse = new Map<string, number>();
    courses.forEach(async (course) => {
      //Nếu như có áp mã giảm giá
      if (createOrderReq.applyDiscount) {
        for (const discount of createOrderReq.applyDiscount) {
          if (discount.courseId === course.id) {
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
              afterDiscount = course.sellPrice - discountInDb.discountAmount;

              //Nếu như discount có áp dụng luật lowrestPrice => tức là không được giảm giá dưới giá này
              if (course.lowestPrice) {
                if (afterDiscount < course.lowestPrice) {
                  afterDiscount = course.lowestPrice;
                }
              }

              total += afterDiscount;
              priceEachCourse.set(course.id, afterDiscount);

              continue;
            }

            //Nếu như discount có áp dụng luật discountPercentage => tức là giảm giá theo %
            if (discountInDb.discountPercentage) {
              afterDiscount = course.sellPrice - course.sellPrice * (discountInDb.discountPercentage / 100);
              //Nếu như discount có áp dụng luật lowrestPrice => tức là không được giảm giá dưới giá này
              if (course.lowestPrice) {
                if (afterDiscount < course.lowestPrice) {
                  afterDiscount = course.lowestPrice;
                }
              }

              total += afterDiscount;
              priceEachCourse.set(course.id, afterDiscount);

              continue;
            }
          }
        }
      }

      total += course.sellPrice;
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

    const coursesInCart = cartItems.map((item) => item.course);

    const calculateTotalResult = await this.calculateTotal(coursesInCart, createOrderReq);

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

    //Clean cart
    await this.cartItemRepository.cleanCart(studentId);

    //Send success email

    if (createOrderReq.customerEmail) {
      let content = `Đơn hàng của bạn đã được tạo thành công với tổng giá trị là ${order.totalPrice}`;

      for (const item of orderItems) {
        content += `\nKhóa học: ${item.course.name} - Giá: ${item.price}`;
      }

      sendEmail({
        from: {
          name: 'Eduhub'
        },
        to: { emailAddress: [createOrderReq.customerEmail] },
        subject: 'Tạo đơn mua khóa học thành công',
        text: content
      });
    }

    return order;
  }
}

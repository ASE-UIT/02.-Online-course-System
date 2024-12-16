import { GetVnpUrl } from '@/dto/payment/get-vnp-url.res';
import { ErrorCode } from '@/enums/error-code.enums';
import { OrderStatus } from '@/enums/order-status.enum';
import { Enrollment } from '@/models/enrollment.model';
import { Order } from '@/models/order.model';
import { Payment } from '@/models/payment.model';
import { IEnrollmentRepository } from '@/repository/interface/i.enrollment.repository';
import { IOrderRepository } from '@/repository/interface/i.order.repository';
import { IPaymentRepository } from '@/repository/interface/i.payment.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IPaymentService } from '@/service/interface/i.payment.service';
import { sendEmail } from '@/utils/email/email-sender.util';
import BaseError from '@/utils/error/base.error';
import { createVNPayUrl } from '@/utils/vnpay/create-pay-url.util';
import { inject, injectable } from 'inversify';
import { ParsedQs } from 'qs';

@injectable()
export class PaymentService extends BaseCrudService<Payment> implements IPaymentService<Payment> {
  private paymentRepository: IPaymentRepository<Payment>;
  private orderRepository: IOrderRepository<Order>;
  private enrollRepository: IEnrollmentRepository<Enrollment>;

  constructor(
    @inject('PaymentRepository') paymentRepository: IPaymentRepository<Payment>,
    @inject('OrderRepository') orderRepository: IOrderRepository<Order>,
    @inject('EnrollmentRepository') enrollRepository: IEnrollmentRepository<Enrollment>
  ) {
    super(paymentRepository);
    this.paymentRepository = paymentRepository;
    this.orderRepository = orderRepository;
    this.enrollRepository = enrollRepository;
  }

  private async createEnrollment(order: Order): Promise<void> {
    const orderItems = order.items;
    for (const item of orderItems) {
      const enrollment = new Enrollment();
      enrollment.courseId = item.courseId;
      enrollment.studentId = order.studentId;
      enrollment.enrolledDate = new Date();
      enrollment.status = 'active';
      enrollment.completionPercentage = 0;

      await this.enrollRepository.save(enrollment);
    }
  }

  /**
   * * Handle VNPay return
   * @param vnp_Params
   */
  async handleVNPayReturn(vnp_Params: any): Promise<void> {
    const orderId = vnp_Params['vnp_TxnRef'];
    const amount = Number(vnp_Params['vnp_Amount']) / 100;
    const bankCode = vnp_Params['vnp_BankCode'];
    const cardType = vnp_Params['vnp_CardType'];
    const orderInfo = vnp_Params['vnp_OrderInfo'];
    delete vnp_Params['vnp_BankCode'];
    delete vnp_Params['vnp_CardType'];
    delete vnp_Params['vnp_OrderInfo'];
    delete vnp_Params['vnp_TxnRef'];
    delete vnp_Params['vnp_Amount'];
    const paycheckInfo = vnp_Params;

    const order = await this.orderRepository.findOne({
      filter: {
        id: orderId
      },
      relations: ['payment', 'items']
    });

    if (!order) {
      throw new BaseError(ErrorCode.NF_01, 'Không tìm thấy đơn hàng');
    }

    const payment = order.payment;

    if (!payment) {
      throw new BaseError(ErrorCode.NF_01, 'Không tìm thấy đơn hàng');
    }

    if (payment.amount !== amount) {
      throw new BaseError(
        ErrorCode.VALIDATION_ERROR,
        'Số tiền không khớp, phải trả ' + payment.amount + ' nhưng đã trả ' + amount
      );
    }

    payment.paymentStatus = true;
    payment.payInfo = {
      bankCode,
      cardType,
      orderInfo,
      paycheckInfo
    };

    await this.paymentRepository.save(payment);

    //Update status of order
    order.status = OrderStatus.PAID;

    await this.orderRepository.save(order);

    //Create enrollment
    await this.createEnrollment(order);

    //Send success email
    const userEmail = order.customerEmail;
    if (userEmail) {
      const content = `Đơn hàng của bạn đã được thanh toán thành công với tổng giá trị là ${order.totalPrice}`;

      sendEmail({
        from: {
          name: 'Eduhub'
        },
        to: { emailAddress: [userEmail] },
        subject: 'Thanh toán khóa học thành công',
        text: content
      });
    }

    return;
  }

  async getVnpUrl(paymentId: string, ipAddr: string): Promise<GetVnpUrl> {
    const payment = await this.paymentRepository.findOne({
      filter: {
        id: paymentId
      },
      relations: ['order']
    });

    if (!payment) {
      throw new BaseError(ErrorCode.NF_01, 'Payment not found');
    }

    //Get total amount
    const total = payment.amount;

    //Get orderId
    const orderId = payment.order.id;

    //Get url from VNPAY
    const payUrl = createVNPayUrl(total, ipAddr, orderId);

    return new GetVnpUrl(payUrl);
  }
}

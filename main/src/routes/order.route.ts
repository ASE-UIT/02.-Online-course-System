import { orderController } from '@/container/order.container';
import { CreateOrderWithCourseIdsReq } from '@/dto/order/create-order-with-course-ids.req';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const orderRouter = express.Router();

orderRouter

  .post(
    '/create-order/with-course-ids',
    authenticateJWT,
    classValidate(CreateOrderWithCourseIdsReq),
    orderController.createOrderWithCourseIds.bind(orderController)
  )

  .post(
    '/create-order',
    authenticateJWT,
    classValidate(CreateOrderReq),
    orderController.createOrder.bind(orderController)
  )

  .get('/get-my-order', authenticateJWT, orderController.getMyOrder.bind(orderController));

export default orderRouter;

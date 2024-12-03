import { orderController } from '@/container/order.container';
import { CreateOrderReq } from '@/dto/order/create-order.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const orderRouter = express.Router();

orderRouter

  .post(
    '/create-order',
    authenticateJWT,
    classValidate(CreateOrderReq),
    orderController.createOrder.bind(orderController)
  )

  .get('/get-order', authenticateJWT, orderController.getOrder.bind(orderController));

export default orderRouter;

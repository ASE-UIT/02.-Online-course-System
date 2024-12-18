import { paymentController } from '@/container/payment.container';
import express from 'express';
const paymentRouter = express.Router();
paymentRouter
  .get('/vnp-return', paymentController.vnpReturn.bind(paymentController))

  .get('/vnp-url/:paymentId', paymentController.getVnpUrl.bind(paymentController));
export default paymentRouter;

import { cartController } from '@/container/cart.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';
const cartRouter = express.Router();

cartRouter

  .delete('/remove/:courseId', authenticateJWT, cartController.removeFromCart.bind(cartController))

  .post('/add', authenticateJWT, cartController.addToCart.bind(cartController))

  .get('/me', authenticateJWT, cartController.getMyCart.bind(cartController));

export default cartRouter;

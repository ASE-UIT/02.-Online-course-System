import { cartController } from '@/container/cart.container';
import express from 'express';
const cartRouter = express.Router();

cartRouter.get('/', cartController.common.findAll.bind(cartController.common));

export default cartRouter;

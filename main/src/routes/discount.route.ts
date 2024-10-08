import { discountController } from '@/container/discount.container';
import { DiscountController } from '@/controller/discount.controller';
import express from 'express';

const discountRouter = express.Router();
discountRouter
.delete('/:id', discountController.softdelete.bind(discountController)) // Xóa mềm khóa học

export default discountRouter;

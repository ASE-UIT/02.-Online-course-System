import { discountController } from '@/container/discount.container';
import express from 'express';

const discountRouter = express.Router();

discountRouter
.delete('/:id', discountController.softdelete.bind(discountController)) // Xóa mềm khóa học

export default discountRouter;

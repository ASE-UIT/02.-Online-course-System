import { courseCategoryController } from '@/container/course_category.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';

const courseCategoryRouter = express.Router();

courseCategoryRouter.get('/', courseCategoryController.findAll.bind(courseCategoryController));
export default courseCategoryRouter;

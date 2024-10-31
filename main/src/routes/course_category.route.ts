import { courseCategoryController } from '@/container/course_category.container';
import { CourseController } from '@/controller/course.controller';
import { CreateCourseCategoryReq } from '@/dto/course_category/create-course_category.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';

const courseCategoryRouter = express.Router();

courseCategoryRouter
  .get('/', courseCategoryController.findAll.bind(courseCategoryController))
  .post('/', classValidate(CreateCourseCategoryReq), courseCategoryController.create.bind(courseCategoryController));

export default courseCategoryRouter;

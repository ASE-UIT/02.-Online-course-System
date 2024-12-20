import { courseRecommendationController } from '@/container/course_recommendation.container';
import { authenticateAnonymousJWT } from '@/middleware/authenticate-anonymous.middleware';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';
const courseRecommendationRouter = express.Router();

courseRecommendationRouter.get(
  '/',
  authenticateAnonymousJWT,
  courseRecommendationController.getAll.bind(courseRecommendationController)
);

export default courseRecommendationRouter;

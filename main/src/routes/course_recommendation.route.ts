import { courseRecommendationController } from '@/container/course_recommendation.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';
const courseRecommendationRouter = express.Router();

courseRecommendationRouter.get(
  '/',
  authenticateJWT,
  courseRecommendationController.getAll.bind(courseRecommendationController)
);

export default courseRecommendationRouter;

import { enrollmentController } from '@/container/enrollment.container';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import express from 'express';
const enrollmentRouter = express.Router();

enrollmentRouter.get('/me', authenticateJWT, enrollmentController.getMyEnrollment.bind(enrollmentController));
enrollmentRouter.get(
  '/completed',
  authenticateJWT,
  enrollmentController.getCompletedEnrollment.bind(enrollmentController)
);
enrollmentRouter.get(
  '/in-progress',
  authenticateJWT,
  enrollmentController.getInProgressEnrollment.bind(enrollmentController)
);
enrollmentRouter.get(
  '/certificate/:courseId',
  authenticateJWT,
  enrollmentController.getCertificate.bind(enrollmentController)
);

export default enrollmentRouter;
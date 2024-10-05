import { lessonController } from '@/container/lesson.container';
import express from 'express';
const lessonRouter = express.Router();

lessonRouter.get('/', lessonController.common.findAll.bind(lessonController.common));

export default lessonRouter;

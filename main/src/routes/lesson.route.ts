import { lessonController } from '@/container/lesson.container';
import express from 'express';
const lessonRouter = express.Router();

lessonRouter.get('/', lessonController.common.findAll.bind(lessonController.common));
lessonRouter.post('/mark', lessonController.common.markLessonComplete.bind(lessonController.common));
lessonRouter.get('/getcompleted', lessonController.common.getCompletedLessons.bind(lessonController.common));

export default lessonRouter;

import { lessonController } from '@/container/lesson.container';
import express from 'express';
const lessonRouter = express.Router();

lessonRouter.get('/', lessonController.common.findAll.bind(lessonController.common));
// lessonRouter.post('/mark', lessonController.markLessonComplete.bind(lessonController.common));
// lessonRouter.get('/getcompleted', lessonController.getCompletedLessons.bind(lessonController.common));

export default lessonRouter;

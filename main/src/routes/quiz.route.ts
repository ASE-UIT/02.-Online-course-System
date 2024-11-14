import express from 'express';
import { quizController } from '@/container/quiz.container';
const quizRouter = express.Router();

quizRouter
  .get('/:lessonId', quizController.findByLessonId.bind(quizController))
  .get('/answer', quizController.answerQuiz.bind(quizController));

export default quizRouter;
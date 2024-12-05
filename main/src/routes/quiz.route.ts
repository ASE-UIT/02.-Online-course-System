import express from 'express';
import { quizController } from '@/container/quiz.container';
import { classValidate } from '@/middleware/class-validate.middleware';
import { AnswerQuizzReq } from '@/dto/quizz/answer-quizz.req';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
const quizRouter = express.Router();

quizRouter
  // .get('/:lessonId', quizController.findByLessonId.bind(quizController))
  .post('/answer', classValidate(AnswerQuizzReq), authenticateJWT, quizController.answerQuiz.bind(quizController))
  .get('/done', authenticateJWT, quizController.doneQuiz.bind(quizController));

export default quizRouter;

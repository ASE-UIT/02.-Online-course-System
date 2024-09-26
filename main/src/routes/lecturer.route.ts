import { lecturerController } from '@/container/lecturer.container';
import express from 'express';
const lecturerRouter = express.Router();

lecturerRouter.get('/', lecturerController.common.findAll.bind(lecturerController.common));

export default lecturerRouter;

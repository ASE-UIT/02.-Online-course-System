import { mediaController } from '@/container/media.container';
import express from 'express';
const mediaRouter = express.Router();

mediaRouter.get('/video-upload-signed-url', mediaController.getVideoUploadSignedUrl.bind(mediaController));
mediaRouter.get('/image-upload-signed-url', mediaController.getImageUploadSignedUrl.bind(mediaController));

export default mediaRouter;

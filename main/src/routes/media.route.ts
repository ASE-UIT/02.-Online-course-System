import { mediaController } from '@/container/media.container';
import uploadImageMiddleware from '@/middleware/upload-image.middleware';
import uploadVideoMiddleware from '@/middleware/upload-video.middleware';
import express from 'express';
const mediaRouter = express.Router();

mediaRouter
  .post(
    '/upload-video/:fileName',
    uploadVideoMiddleware.single('file'),
    mediaController.uploadVideo.bind(mediaController)
  )

  .post(
    '/upload-image/:fileName',
    uploadImageMiddleware.single('file'),
    mediaController.uploadImage.bind(mediaController)
  )

  .get('/video-url', mediaController.getVideoUrl.bind(mediaController))

  .get('/image-url', mediaController.getImageUrl.bind(mediaController));

export default mediaRouter;

import { GetMediaUrlRes } from '@/dto/media/get-image-url.res';
import { GetMediaUploadSignedUrlRes } from '@/dto/media/get-media-upload-signed-url.res';
import { GetVideoUrlRes } from '@/dto/media/get-video-url.res';
import { MediaUploadRes } from '@/dto/media/media-upload.res';

export interface IMediaService {
  getImageUrl(): Promise<GetMediaUrlRes>;
  uploadImage(fileName: string, tempFilePath: string): Promise<MediaUploadRes>;
  getVideoUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes>;
  getImageUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes>;
  uploadVideo(fileName: string, tempFilePath: string): Promise<MediaUploadRes>;
  getVideoUrl(): Promise<GetMediaUrlRes>;
}

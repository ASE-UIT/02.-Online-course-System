import { GetMediaUploadSignedUrlRes } from '@/dto/media/get-media-upload-signed-url.res';

export interface IMediaService {
  getVideoUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes>;
  getImageUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes>;
}

import { TIME_CONSTANTS } from '@/constants/time.constants';
import { GetMediaUploadSignedUrlRes } from '@/dto/media/get-media-upload-signed-url.res';
import { IMediaService } from '@/service/interface/i.media.service';
import { GlobalConfig } from '@/utils/config/global-config.util';
import minioClient from '@/utils/minio/minio-instance.util';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { MediaUploadRes } from '@/dto/media/media-upload.res';
import { GetVideoUrlRes } from '@/dto/media/get-video-url.res';
import { GetMediaUrlRes } from '@/dto/media/get-image-url.res';

@injectable()
export class MediaService implements IMediaService {
  async getImageUrl(): Promise<GetMediaUrlRes> {
    const bucketName = GlobalConfig.media_service.image_bucket.path;
    const fileName = uuidv4();
    return {
      mediaUrl: GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName,
      fileName: fileName
    };
  }

  async uploadImage(fileName: string, tempFilePath: string): Promise<MediaUploadRes> {
    const bucketName = GlobalConfig.media_service.image_bucket.path;
    await minioClient.fPutObject(bucketName, fileName, tempFilePath);

    // Xóa file tạm sau khi upload
    fs.unlink(tempFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting temp file:', unlinkErr);
      }
    });

    return {
      mediaUrl: GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName
    };
  }

  async getVideoUrl(): Promise<GetMediaUrlRes> {
    const bucketName = GlobalConfig.media_service.video_bucket.path;
    const fileName = uuidv4();
    return {
      mediaUrl: GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName,
      fileName: fileName
    };
  }

  async uploadVideo(fileName: string, tempFilePath: string): Promise<MediaUploadRes> {
    const bucketName = GlobalConfig.media_service.video_bucket.path;
    await minioClient.fPutObject(bucketName, fileName, tempFilePath);

    // Xóa file tạm sau khi upload
    fs.unlink(tempFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting temp file:', unlinkErr);
      }
    });

    return {
      mediaUrl: GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName
    };
  }

  async getVideoUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes> {
    const bucketName = GlobalConfig.media_service.video_bucket.path; // Tên bucket trong MinIO
    const fileName = uuidv4();
    const expiry = TIME_CONSTANTS.HOUR / 1000; // URL sẽ có hiệu lực trong 1 giờ

    const uploadUrl = await minioClient.presignedPutObject(bucketName, fileName, expiry);
    const getUrl = GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName;
    return {
      uploadUrl,
      getUrl,
      fileName
    };
  }

  async getImageUploadSignedUrl(): Promise<GetMediaUploadSignedUrlRes> {
    const bucketName = GlobalConfig.media_service.image_bucket.path; // Tên bucket trong MinIO
    const fileName = uuidv4();
    const expiry = TIME_CONSTANTS.HOUR / 1000; // URL sẽ có hiệu lực trong 1 giờ

    const uploadUrl = await minioClient.presignedPutObject(bucketName, fileName, expiry);
    const getUrl = GlobalConfig.media_service.url + '/' + bucketName + '/' + fileName;

    return {
      uploadUrl,
      getUrl,
      fileName
    };
  }
}

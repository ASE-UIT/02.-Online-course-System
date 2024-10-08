import { TIME_CONSTANTS } from '@/constants/time.constants';
import { GetMediaUploadSignedUrlRes } from '@/dto/media/get-media-upload-signed-url.res';
import { IMediaService } from '@/service/interface/i.media.service';
import { GlobalConfig } from '@/utils/config/global-config.util';
import minioClient from '@/utils/minio/minio-instance.util';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export class MediaService implements IMediaService {
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

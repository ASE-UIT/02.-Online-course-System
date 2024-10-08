import { Expose } from 'class-transformer';

export class GetMediaUploadSignedUrlRes {
  @Expose()
  uploadUrl!: string;
  @Expose()
  getUrl!: string;
  @Expose()
  fileName!: string;
}

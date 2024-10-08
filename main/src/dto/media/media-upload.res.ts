import { Expose } from 'class-transformer';

export class MediaUploadRes {
  @Expose()
  mediaUrl!: string;
}

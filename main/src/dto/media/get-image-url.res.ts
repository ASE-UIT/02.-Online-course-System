import { Expose } from 'class-transformer';

export class GetMediaUrlRes {
  @Expose()
  mediaUrl!: string;
  @Expose()
  fileName!: string;
}

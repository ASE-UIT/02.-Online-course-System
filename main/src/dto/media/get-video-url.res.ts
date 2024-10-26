import { Expose } from 'class-transformer';

export class GetVideoUrlRes {
  @Expose()
  videoUrl!: string;
  @Expose()
  fileName!: string;
}

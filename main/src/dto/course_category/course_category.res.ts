import { Expose } from 'class-transformer';

export class CourseCategoryRes {
  @Expose()
  id!: string;
  @Expose()
  name!: string;
  @Expose()
  decription!: string;
  @Expose()
  thumbnail!: string;
}

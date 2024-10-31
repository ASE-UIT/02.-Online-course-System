import { Expose } from 'class-transformer';

export class CreateCourseCategoryRes {
  @Expose()
  id!: string;

  @Expose()
  name!: string;
}

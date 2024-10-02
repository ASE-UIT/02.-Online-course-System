import { Expose } from 'class-transformer';

export class BaseRes {
  @Expose()
  createAt!: Date;
  @Expose()
  updateAt!: Date;
  @Expose()
  createBy!: string;
  @Expose()
  updateBy!: string;
  @Expose()
  deleteAt!: Date;
}

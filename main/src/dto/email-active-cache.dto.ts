import { Expose } from 'class-transformer';

export class EmailActivateCacheDto {
  @Expose()
  tempUser!: any;

  @Expose()
  code!: string;

  constructor(tempUser: any, code: string) {
    this.tempUser = tempUser;
    this.code = code;
  }
}

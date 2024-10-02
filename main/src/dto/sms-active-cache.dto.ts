import { Expose } from 'class-transformer';

export class SmsActivateCacheDto {
  @Expose()
  tempUser!: any;

  @Expose()
  code!: string;

  constructor(tempUser: any, code: string) {
    this.tempUser = tempUser;
    this.code = code;
  }
}

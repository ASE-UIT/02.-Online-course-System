import { Expose } from 'class-transformer';

export class LoginRes {
  @Expose()
  token!: string;

  constructor(token: string) {
    this.token = token;
  }
}

import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleWithAccountReq {
  @IsNotEmpty()
  @IsString()
  @Expose()
  roleName!: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @Expose()
  accountIdList!: string[];
}

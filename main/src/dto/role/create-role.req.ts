import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleReq {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

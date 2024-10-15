import { IsNotEmpty, IsString } from 'class-validator';

export class StudentGoogleCallbackReq {
  @IsNotEmpty()
  @IsString()
  idToken!: string;
}

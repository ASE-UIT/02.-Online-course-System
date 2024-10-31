import { IsNotEmpty, IsString } from 'class-validator';

export class AddToCartReq {
  @IsNotEmpty()
  @IsString()
  courseId!: string;

  // @IsNotEmpty()
  // amount!: number;
}

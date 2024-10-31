import { IsDateString, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateCourseCategoryReq {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  thumbnail!: string;
}

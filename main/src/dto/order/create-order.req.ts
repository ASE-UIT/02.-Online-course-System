import { ApplyDiscountDto } from '@/dto/discount/apply-discount.dto';
import { PayType } from '@/enums/pay-type.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateOrderReq {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ApplyDiscountDto)
  applyDiscount?: ApplyDiscountDto[];

  @IsNotEmpty()
  @IsEnum(PayType)
  payType!: string;

  @IsOptional()
  @IsString()
  customerFullname?: string;

  @IsOptional()
  @IsString()
  customerEmail?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;
}

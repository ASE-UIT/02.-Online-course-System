import { ApplyDiscountDto } from '@/dto/discount/apply-discount.dto';
import { PayType } from '@/enums/pay-type.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class CreateOrderReq {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ApplyDiscountDto)
  applyDiscount?: ApplyDiscountDto[];

  @IsNotEmpty()
  @IsEnum(PayType)
  payType!: string;
}

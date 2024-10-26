import { PagingResponseDto } from '@/dto/paging-response.dto';
import { PagingDto } from '@/dto/paging.dto';
import { Discount } from '@/models/discount.model';
import { IDiscountRepository } from '@/repository/interface/i.discount.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IDiscountService } from '@/service/interface/i.discount.service';
import { inject, injectable } from 'inversify';

@injectable()
export class DiscountService extends BaseCrudService<Discount> implements IDiscountService<Discount> {
  private discountRepository: IDiscountRepository<Discount>;
  constructor(@inject('DiscountRepository') discountRepository: IDiscountRepository<Discount>) {
    super(discountRepository);
    this.discountRepository = discountRepository;
  }

  async softdelete(id: string): Promise<void> {
    // Tìm khóa học theo ID
    const existingDiscount = await this.discountRepository.findOne({ filter: { id } });
    
    if (!existingDiscount) {
        throw new Error('Discount not found'); // Thông báo lỗi nếu không tìm thấy ma giam gia
    }

    // Cập nhật trường deletedAt với thời gian hiện tại
    const updatedData = {
        ...existingDiscount,
        deletedAt: new Date() // Thiết lập thời gian xóa
    };

    // Gọi hàm findOneAndUpdate từ IBaseRepository để cập nhật ma giam gia
    await this.discountRepository.findOneAndUpdate({
        filter: { id },
        updateData: updatedData
    });
}
}

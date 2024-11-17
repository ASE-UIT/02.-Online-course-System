import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { CourseCategory } from '@/models/course_category.model';

export interface ICourseCategoryService<T extends BaseModelType> extends IBaseCrudService<T> {
    softDelete(id: string): Promise<void>;
    updateCategory(id: string, data: Partial<CourseCategory>): Promise<void>;

}

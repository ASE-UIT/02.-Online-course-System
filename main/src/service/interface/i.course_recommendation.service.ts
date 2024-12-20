import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { Course } from '@/models/course.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';
import { ParsedQs } from 'qs';

export interface ICourseRecommendationService<T> extends IBaseCrudService<T> {
  getRecommend(user: JwtClaimDto | undefined, topN: number): Promise<Course[]>;
}

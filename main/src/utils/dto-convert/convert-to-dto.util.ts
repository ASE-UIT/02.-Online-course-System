import { ClassConstructor, plainToInstance } from 'class-transformer';

export function convertToDto<DTO_TYPE>(DTO: ClassConstructor<DTO_TYPE>, data: any): DTO_TYPE {
  return plainToInstance(DTO, data, { excludeExtraneousValues: true });
}

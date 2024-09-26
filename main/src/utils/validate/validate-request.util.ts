import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateRequest(dto: any, data: any): Promise<any> {
  const dtoInstance = plainToInstance(dto, data);
  const validateErrors = await validate(dtoInstance, {
    validationError: { target: false, value: false }
  });
  if (validateErrors.length > 0) {
    const formatError = validateErrors.map((error: any) => Object.values(error.constraints).join(', '));
    throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Your request body is not valid', formatError);
  }
  return dtoInstance;
}

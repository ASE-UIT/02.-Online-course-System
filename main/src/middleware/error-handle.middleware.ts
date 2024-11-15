import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { QueryFailedError, TypeORMError } from 'typeorm';

/**
 * Middleware to handle the error before sending it to the client
 * @param error
 * @param req
 * @param res
 * @param next
 */
export const globalErrorHanlder = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error instanceof BaseError) {
    switch (error.code) {
      case ErrorCode.VALIDATION_ERROR:
        return res.send_badRequest('Validation Error', error);
      case ErrorCode.AUTH_02:
        return res.send_unauthorized('Unauthorized', error);
      case ErrorCode.AUTH_01:
        return res.send_unauthorized('Unauthorized', error);
      case ErrorCode.PERMISSION_01:
        return res.send_forbidden('Forbidden', error);
      case ErrorCode.BAD_REQUEST:
        return res.send_badRequest('Bad Request', error);
      case ErrorCode.PHONE_NUMBER_NOT_FOUND:
        return res.send_notFound('Phone number not found', error);
      case ErrorCode.INVALID_CODE:
        return res.send_badRequest('Invalid code', error);
      case ErrorCode.INVALID_OTP:
        return res.send_badRequest('Invalid OTP', error);
      default:
        return res.send_internalServerError(error.message, error);
    }
  }

  if (error instanceof TypeORMError) {
    if (error instanceof QueryFailedError) {
      if ((error as unknown as any).code === '23505') {
        const duplicateError = {
          code: ErrorCode.DUPLICATE_ERROR,
          msg: (error as unknown as any).detail
        };
        return res.send_badRequest('Duplicate error', duplicateError);
      }
    }
  }

  return res.send_internalServerError(ReasonPhrases.INTERNAL_SERVER_ERROR, error.message);
};

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
    }
  }

  if (error instanceof TypeORMError) {
    if (error instanceof QueryFailedError) {
      return res.send_badRequest('Query Failed Error', error.message);
    }
  }

  return res.send_internalServerError(ReasonPhrases.INTERNAL_SERVER_ERROR, error.message);
};

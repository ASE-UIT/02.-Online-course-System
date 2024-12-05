import { sortObject } from '@/utils/other/sort-object.util';
import { Request } from 'express';
import querystring from 'qs';
import crypto from 'crypto';
import BaseError from '@/utils/error/base.error';
import { ErrorCode } from '@/enums/error-code.enums';

export function checkVnpReturnUtil(req: Request): void {
  let vnp_Params = req.query;

  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = process.env.VNP_TMN_CODE || '';
  const secretKey = process.env.VNP_HASH_SECRET || '';

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash !== signed) {
    throw new BaseError(ErrorCode.VALIDATION_ERROR, 'Invalid signature');
  }

  return;
}

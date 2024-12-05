import { sortObject } from '../other/sort-object.util';
import querystring from 'qs';
import moment from 'moment';
import crypto from 'crypto';

export function createVNPayUrl(total: number, ipAddr: string, orderId: string): string {
  process.env.TZ = 'Asia/Ho_Chi_Minh';

  const date = new Date();
  const createDate = moment(date).format('YYYYMMDDHHmmss');

  const tmnCode = process.env.VNP_TMN_CODE || '';
  const secretKey = process.env.VNP_HASH_SECRET || '';
  let vnpUrl = process.env.VNP_URL || '';
  const returnUrl = process.env.VNP_RETURN_URL;
  const currCode = 'VND';
  let vnp_Params: any = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId; ///Day la ma don hang trong db
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = total * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl; //Thanh toan xong se refirect ve link nay
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
  return vnpUrl;
}

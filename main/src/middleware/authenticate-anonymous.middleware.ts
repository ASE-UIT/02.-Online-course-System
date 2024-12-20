import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import jwt from 'jsonwebtoken';

export async function authenticateAnonymousJWT(req: any, res: any, next: any) {
  try {
    //Log all header
    console.log('request header:', req.headers);

    let token: string = req.header('Authorization');
    if (!token) {
      //User is anonymous => set user to null
      req.user = null;
      return next();
    }
    if (token != null) {
      token = token.split('Bearer ')[1];
    }
    const secretKey = process.env.LOGIN_SECRET || '';
    jwt.verify(token, secretKey, async (err: any, user: any) => {
      if (err) {
        //User is anonymous => set user to null
        req.user = null;
        return next();
      }
      console.log('Logged in as:', user);
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}

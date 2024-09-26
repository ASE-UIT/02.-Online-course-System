import BaseError from '@/utils/error/base.error';

// export const errorHanlder = ((error: BaseError, req: any, res: any, next: any) => {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || 'error';
//     console.log('Error:::' + error);
//     res.status(error.statusCode).json({
//         statusCode: error.statusCode,
//         status: error.status,
//         message: error.message,
//     });
// });

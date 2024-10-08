import { ErrorCode } from '@/enums/error-code.enums';
import { IMediaService } from '@/service/interface/i.media.service';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class MediaController {
  private mediaService: IMediaService;

  constructor(@inject('MediaService') mediaService: IMediaService) {
    this.mediaService = mediaService;
  }

  async getVideoUploadSignedUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const signedUrl = await this.mediaService.getVideoUploadSignedUrl();
      res.send_ok('Get video upload signed url successfully', signedUrl);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Get video upload signed url failed');
    }
  }

  async getImageUploadSignedUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const signedUrl = await this.mediaService.getImageUploadSignedUrl();
      res.send_ok('Get image upload signed url successfully', signedUrl);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Get image upload signed url failed');
    }
  }
}

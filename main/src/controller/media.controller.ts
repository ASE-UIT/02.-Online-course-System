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

  async getImageUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.mediaService.getImageUrl();
      res.send_ok('Get image url successfully', result);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Get video url failed');
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.send_badRequest('No file uploaded or file is too large.');
    }
    if (!req.params.fileName) {
      return res.send_badRequest('No file name provided.');
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.params.fileName;

      const result = await this.mediaService.uploadImage(fileName, tempFilePath);
      res.send_ok('Upload image successfully', result);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Upload image failed');
    }
  }

  async uploadVideo(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.send_badRequest('No file uploaded or file is too large.');
    }
    if (!req.params.fileName) {
      return res.send_badRequest('No file name provided.');
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.params.fileName;

      const result = await this.mediaService.uploadVideo(fileName, tempFilePath);
      res.send_ok('Upload video successfully', result);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Upload video failed');
    }
  }

  async getVideoUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.mediaService.getVideoUrl();
      res.send_ok('Get video url successfully', result);
    } catch (error) {
      throw new BaseError(ErrorCode.UNKNOWN, 'Get video url failed');
    }
  }
}

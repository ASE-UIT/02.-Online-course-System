import { NextFunction, Request, Response } from 'express';

export function endRequestPipelineMiddleware(req: Request, res: Response, next: NextFunction) {
  res.end();
}

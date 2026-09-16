import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError.ts';

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(`Route not founded ${req.method} ${req.originalUrl}`, 404));
}

import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError.ts';
import { ZodError } from 'zod';

export function errorHandler(_req: Request, res: Response, err: Error, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }

  console.log(err);
  return res.status(500).json({ error: 'Internal server error' });
}

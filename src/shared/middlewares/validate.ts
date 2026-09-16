import type { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export const validate =
  (schema: ZodObject, source: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.valid = req.valid || {};
    req.valid[source] = schema.parse(req[source]);
    next();
  };

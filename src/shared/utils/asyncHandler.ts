import type { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

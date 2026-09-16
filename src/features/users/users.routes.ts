import { usersController } from './users.controller.ts';
import { Router } from 'express';
import { validate } from '../../shared/middlewares/validate.ts';
import { asyncHandler } from '../../shared/utils/asyncHandler.ts';
import {
  createUserSchema,
  updateUserSchema,
  idUserParamSchema,
  nameUserParamSchema,
} from './users.schema.ts';

const usersRoutes = Router();

usersRoutes.post(
  '/users',
  validate(createUserSchema, 'body'),
  asyncHandler(usersController.register),
);
usersRoutes.get('/users', usersController.listAll);
usersRoutes.get(
  '/users/:name',
  validate(nameUserParamSchema, 'params'),
  asyncHandler(usersController.showByName),
);
usersRoutes.get(
  '/users/:id_code',
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.showById),
);
usersRoutes.put(
  '/users/:id_code',
  validate(updateUserSchema, 'body'),
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.update),
  asyncHandler(usersController.showById),
);
usersRoutes.delete(
  '/users/:id_code',
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.showById),
  asyncHandler(usersController.destroy),
);

export { usersRoutes };

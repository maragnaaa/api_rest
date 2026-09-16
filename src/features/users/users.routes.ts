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

usersRoutes.post('/', validate(createUserSchema, 'body'), asyncHandler(usersController.register));
usersRoutes.get('/', usersController.listAll);
usersRoutes.get(
  '/name/:name',
  validate(nameUserParamSchema, 'params'),
  asyncHandler(usersController.showByName),
);
usersRoutes.get(
  '/id/:id_code',
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.showById),
);
usersRoutes.put(
  '/:id_code',
  validate(updateUserSchema, 'body'),
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.update),
  asyncHandler(usersController.showById),
);
usersRoutes.delete(
  '/:id_code',
  validate(idUserParamSchema, 'params'),
  asyncHandler(usersController.showById),
  asyncHandler(usersController.destroy),
);

export { usersRoutes };

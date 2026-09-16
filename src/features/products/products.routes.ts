import { Router } from 'express';
import { productsController } from './products.controller.ts';
import { asyncHandler } from '../../shared/utils/asyncHandler.ts';
import { validate } from '../../shared/middlewares/validate.ts';
import {
  createProductsSchema,
  updateProductSchema,
  nameProductParamSchema,
  codeProductParamSchema,
} from './products.schema.ts';
import { idUserParamSchema } from '../users/users.schema.ts';

const productsRoutes = Router();

productsRoutes.post(
  '/products',
  validate(createProductsSchema, 'body'),
  asyncHandler(productsController.register),
);
productsRoutes.get('/products', asyncHandler(productsController.listAllProducts));
productsRoutes.get(
  '/products/:name',
  validate(nameProductParamSchema, 'params'),
  asyncHandler(productsController.showByName),
);
productsRoutes.get(
  '/products/:id',
  validate(idUserParamSchema, 'params'),
  asyncHandler(productsController.showByCode),
);
productsRoutes.put(
  '/products/:id',
  validate(updateProductSchema, 'body'),
  validate(codeProductParamSchema, 'params'),
  asyncHandler(productsController.update),
);
productsRoutes.delete(
  '/products/:id',
  validate(idUserParamSchema, 'params'),
  asyncHandler(productsController.destroy),
);

export { productsRoutes };

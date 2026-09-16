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

const router = Router();

router.post(
  '/products',
  validate(createProductsSchema, 'body'),
  asyncHandler(productsController.register),
);
router.get('/products', asyncHandler(productsController.listAllProducts));
router.get(
  '/products/:name',
  validate(nameProductParamSchema, 'params'),
  asyncHandler(productsController.showByName),
);
router.get(
  '/products/:id',
  validate(idUserParamSchema, 'params'),
  asyncHandler(productsController.showByCode),
);
router.put(
  '/products/:id',
  validate(updateProductSchema, 'body'),
  validate(codeProductParamSchema, 'params'),
  asyncHandler(productsController.update),
);
router.delete(
  '/products/:id',
  validate(idUserParamSchema, 'params'),
  asyncHandler(productsController.destroy),
);

export { router };

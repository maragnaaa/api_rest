import { Router } from "express";
import { productsController } from "./products.controller.js"
import { validate } from "../../shared/middlewares/validate.js"
import {
    createProductSchema,
    updateProductSchema,
    productCodeParamSchema,
    productNameParamSchema
}
from "./products.schema.js";

const productsRoutes = Router();

productsRoutes.get(
    '/', 
    productsController.index
);

productsRoutes.get(
    '/code/:code', 
    validate(productCodeParamSchema, "params"),
    productsController.showByCode
);

productsRoutes.get(
    '/name/:name', 
    validate(productNameParamSchema, "params"),
    productsController.showByName
);

productsRoutes.post(
    '/',
    validate(createProductSchema, "body"),
    productsController.store
);

productsRoutes.put(
    '/:code',
    validate(productCodeParamSchema, "params"),
    validate(updateProductSchema, "body"),
    productsController.update
);

productsRoutes.delete(
    '/:code', 
    validate(productCodeParamSchema, "params"),
    productsController.destroy
);

export default productsRoutes;
import { productsServices } from './products.service.ts';
import type { Request, Response } from 'express';
import type {
  CreateProductInput,
  UpdateProductInput,
  NameProductParamInput,
  CodeProductParamInput,
} from './products.schema.ts';

export const productsController = {
  async register(req: Request, res: Response) {
    const newProduct = await productsServices.createProduct(req.valid?.body as CreateProductInput);
    res.status(201).json(newProduct);
  },

  async listAllProducts(_req: Request, res: Response) {
    const allProducts = await productsServices.listAllProducts();
    res.status(200).json(allProducts);
  },

  async showByName(req: Request, res: Response) {
    const { name } = req.valid?.params as NameProductParamInput;
    const product = await productsServices.getProductByName(name);
    res.status(200).json(product);
  },

  async showByCode(req: Request, res: Response) {
    const { code } = req.valid?.params as CodeProductParamInput;
    const product = await productsServices.getProductByCode(code);
    res.status(200).json(product);
  },

  async update(req: Request, res: Response) {
    const { code } = req.valid?.params as CodeProductParamInput;
    const product = await productsServices.updateProduct(
      code,
      req.valid?.body as UpdateProductInput,
    );
    res.status(200).json(product);
  },

  async destroy(req: Request, res: Response) {
    const { code } = req.valid?.params as CodeProductParamInput;
    await productsServices.deleteProduct(code);
    res.status(200).json({ success: 'Product successfully deleted' });
  },
};

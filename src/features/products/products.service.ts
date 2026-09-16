import { productsRepository } from './products.repository.ts';
import { AppError } from '../../shared/errors/appError.ts';
import { productsDTO } from './products.dto.ts';
import type { CreateProductInput, UpdateProductInput } from './products.schema.ts';

export const productsServices = {
  async createProduct(data: CreateProductInput, code: number) {
    const productExists = await productsRepository.findProductsByCode(code);

    if (productExists) {
      throw new AppError('Product already registered', 409);
    }

    const product = await productsRepository.create(data);
    return productsDTO(product);
  },

  async listAllProducts() {
    const products = await productsRepository.findAllProducts();

    if (!products || products.length === 0) {
      throw new AppError('There are no registered products', 404);
    }

    return products.map(productsDTO);
  },

  async getProductByName(name: string) {
    const product = await productsRepository.findProductByName(name);

    if (!product) {
      throw new AppError('Product not founded', 404);
    }

    return productsDTO(product);
  },

  async getProductByCode(code: number) {
    const product = await productsRepository.findProductsByCode(code);

    if (!product) {
      throw new AppError('Product not founded', 404);
    }

    return productsDTO(product);
  },

  async updateProduct(code: number, data: UpdateProductInput) {
    const productExists = await productsRepository.findProductsByCode(code);

    if (!productExists) {
      throw new AppError('Product not founded', 404);
    }

    const product = await productsRepository.update(code, data);
    return productsDTO(product);
  },

  async deleteProduct(code: number) {
    const productExists = await productsRepository.findProductsByCode(code);

    if (!productExists) {
      throw new AppError('Product not founded', 404);
    }

    await productsRepository.delete(code);
  },
};

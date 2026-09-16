import { prisma } from '../../config/prisma.ts';
import type { CreateProductInput, UpdateProductInput } from './products.schema.ts';

export const productsRepository = {
  async create(data: CreateProductInput) {
    return prisma.products.create({ data });
  },

  async findAllProducts() {
    return prisma.products.findMany();
  },

  async findProductByName(name: string) {
    return prisma.products.findUnique({ where: { name } });
  },

  async findProductsByCode(code: number) {
    return prisma.products.findUnique({ where: { code } });
  },

  async update(code: number, data: UpdateProductInput) {
    return prisma.products.update({ where: { code }, data });
  },

  async delete(code: number) {
    return prisma.products.delete({ where: { code } });
  },
};

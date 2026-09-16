import type { products } from '../../generated/prisma/client.ts';

export function productsDTO(products: products) {
  return {
    code: products.code,
    name: products.name,
    price: products.price,
  };
}

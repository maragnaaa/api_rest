import { z } from 'zod';

export const createProductsSchema = z.object({
  code: z.coerce.number().positive().nonoptional(),
  name: z
    .string()
    .nonempty()
    .regex(/^[\p{L} ]+$/u),
  price: z.float32().positive().nonoptional(),
});

export const updateProductSchema = createProductsSchema.partial();

export const codeProductParamSchema = z.object({
  name: z
    .string()
    .nonempty()
    .regex(/^[\p{L} ]+$/u),
});

export const nameProductParamSchema = z.object({
  code: z.number().positive().nonoptional(),
});

export type CreateProductInput = z.infer<typeof createProductsSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CodeProductParamInput = z.infer<typeof codeProductParamSchema>;
export type NameProductParamInput = z.infer<typeof nameProductParamSchema>;

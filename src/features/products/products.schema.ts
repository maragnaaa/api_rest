import { z } from 'zod';

export const createProductsSchema = z.object({
  code: z.coerce.number().positive().nonoptional(),
  name: z
    .string()
    .nonempty()
    .regex(/^[a-zA-B0-9a-zA-ZÀ-ÿ\s]+$/),
  price: z.float32().positive().nonoptional(),
});

export const updateProductSchema = createProductsSchema.partial();

export const nameProductParamSchema = z.object({
  name: z
    .string()
    .nonempty()
    .regex(/^[a-zA-B0-9a-zA-ZÀ-ÿ\s]+$/),
});

export const codeProductParamSchema = z.object({
  code: z.coerce.number().positive().nonoptional(),
});

export type CreateProductInput = z.infer<typeof createProductsSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CodeProductParamInput = z.infer<typeof codeProductParamSchema>;
export type NameProductParamInput = z.infer<typeof nameProductParamSchema>;

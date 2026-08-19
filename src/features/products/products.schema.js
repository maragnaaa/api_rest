import { z } from "zod"

export const createProductSchema = z.object({
    code: z.number().int().min(1).max(3),
    name: z.string().min(1),
    price: z.float64().min(1)
});

export const updateProductSchema = createProductSchema.partial();

export const productCodeParamSchema = z.object({
    code: z.coerce.number().int().min(1).max(3)
});

export const productNameParamSchema = z.object({
    name: z.string().min(1),
});

export const listProductsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(20).default(1),
});